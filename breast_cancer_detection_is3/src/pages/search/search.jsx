import './search.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button, Input, Loader, Card, Text, Pagination, Container } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateMedicalCode } from '../validators/validator'
import { readPatient } from '../../firebase/patientController'
import { readCasesByPatient } from '../../firebase/casesController'
import { BackgroundImage } from '@mantine/core'

const Search = () => {
    const { t } = useTranslation();
    const [patientID, setPatientID] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isIDValid, setIsIDValid] = useState(false);
    const [casesPatient, setCasesPatient] = useState({});
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const ITEMS_PER_PAGE = 5;

    const handleChange = (event) => {
        const { value } = event.target;
        setPatientID(value);

        if (!validateMedicalCode(value)) {
            setIsIDValid(false);
            setError('Patient ID not valid');
        } else {
            setIsIDValid(true);
            setError('');
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentPage(1);
        try {
            const data = await readPatient(patientID);
            if (data) {
                const cases = await readCasesByPatient(patientID);
                setCasesPatient(cases);
                setIsLoading(false);
                setSearchPerformed(true);
                if (Object.keys(cases).length === 0) {
                    alert("No se encontraron casos para el paciente: " + patientID); 
                    setSearchPerformed(false);
                }
            } else {
                alert("Patient not found");
                setSearchPerformed(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error al buscar el paciente");
            setSearchPerformed(false);
        } finally {
            setIsLoading(false);
        }
    }

    const handleViewDetails = (caseId) => {
        navigate(`/case/${caseId}`);
    }

    const paginatedCases = Object.entries(casesPatient).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="searchPage">
            <Header />
                <div className='image_back'>
                    <BackgroundImage
                        src="https://www.unir.net/wp-content/uploads/sites/22/2021/06/shutterstock_1783752014.jpg"
                        style={{ height: 200, backgroundSize: 'cover' , 
                        backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
                         }}
                    >
                        <h1 style={{color:'white'}}>{t("search:tittle")}</h1>
                    </BackgroundImage>
                </div>
                <div className='searchForm'>
                    <form className="home-form-dni" onSubmit={handleSearch}>
                        <Input.Wrapper label={t('home:form:label')} error={error} style={{marginBottom:'0.5rem'}}>
                            <Input placeholder={t('home:form:placeholder')} value={patientID} onChange={handleChange} />
                        </Input.Wrapper>
                        <Button type="submit" color="blue" disabled={!isIDValid || isLoading} style={{borderRadius:"10px"}}>
                            {isLoading ? <Loader color="white" size="sm" /> : t('home:form:button')}
                        </Button>
                    </form>
                </div>
                <div className='searchResults'>
                    {/* <h1>{t("search:tittle")}</h1> */}
                    <div className='searchResultsContent'>
                        {searchPerformed && (
                            paginatedCases.length > 0 ? (
                                <>
                                    {paginatedCases.map(([caseId, caseData]) => (
                                        <Card key={caseId} shadow="sm" padding="lg" radius="md" withBorder className="case-card">
                                            <Card.Section withBorder inheritPadding py="xs">
                                                <Text weight={500}>{t("search:case")}: {caseId}</Text>
                                            </Card.Section>
                                            <Text size="sm" mt="sm"><b>{t("search:date")}:</b> {caseData.date}</Text>
                                            <Text size="sm"><b>{t("search:time")}:</b> {caseData.time}</Text>
                                            <Text size="sm"><b>{t("search:doctor")}:</b> {caseData.doctorID}</Text>
                                            <Text size="sm"><b>{t("search:patient")}:</b> {caseData.patientID}</Text>
                                            <Text size="sm"><b>{t("search:image")}:</b> {caseData.nameImage}</Text>
                                            <Button 
                                                variant="light" 
                                                color="blue" 
                                                fullWidth 
                                                mt="md" 
                                                radius="md"
                                                onClick={() => handleViewDetails(caseId)}
                                            >
                                                {t("search:details")}
                                            </Button>
                                        </Card>
                                    ))}
                                    <Pagination
                                        total={Math.ceil(Object.keys(casesPatient).length / ITEMS_PER_PAGE)}
                                        page={currentPage}
                                        onChange={setCurrentPage}
                                        mt="xl"
                                    />
                                </>
                            ) : (
                                <Text>No se encontraron casos para este paciente.</Text>
                            )
                        )}
                    </div>        
                </div>
            
            <Footer />
        </div>
    )
}

export default Search;