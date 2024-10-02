import './medicalHistory.css'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { Button, Input, Loader, Card, Text, Pagination, Container } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateMedicalCode } from '../../components/validators/validator'
import { readPatient } from '../../firebase/patientController'
import { readCasesByPatient } from '../../firebase/casesController'

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
        setSearchPerformed(true);
        setCurrentPage(1);
        try {
            const data = await readPatient(patientID);
            if (data) {
                const cases = await readCasesByPatient(patientID);
                setCasesPatient(cases);
                console.log(cases);
            } else {
                alert("Patient not found");
            }
        } catch (error) {
            console.error(error);
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
                <div className='searchForm'>
                    <form className="home-form-dni" onSubmit={handleSearch}>
                        <Input.Wrapper label={t('home:form:label')} error={error} style={{marginBottom:'0.5rem'}}>
                            <Input placeholder={t('home:form:placeholder')} value={patientID} onChange={handleChange} />
                        </Input.Wrapper>
                        <Button type="submit" color="blue" disabled={!isIDValid || isLoading}>
                            {isLoading ? <Loader color="white" size="sm" /> : t('home:form:button')}
                        </Button>
                    </form>
                </div>
                <div className='searchResults'>
                    <h1>{t("search:tittle")}</h1>
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