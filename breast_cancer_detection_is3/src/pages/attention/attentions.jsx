import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Text, Button, Pagination, Loader } from '@mantine/core';
import { readCasesByDoctor } from '../../firebase/casesController'; // Asegúrate de que la ruta sea correcta
import Header from '../../components/header';
import Footer from '../../components/footer';
import './attentions.css'; // Asegúrate de crear este archivo CSS
import { useTranslation } from 'react-i18next';
import { BackgroundImage } from '@mantine/core';

const Attentions = () => {
    const { doctorID } = useParams();
    const [attentions, setAttentions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 5;
    const {t} = useTranslation()

    const searchAttentions = async () => {
        setIsLoading(true);
        try {
            const cases = await readCasesByDoctor(doctorID);
            setAttentions(cases);
            console.log(cases);
        } catch (error) {
            console.error("Error fetching doctor attentions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchAttentions();
    }, [doctorID]); // Dependencia añadida para que se actualice si cambia el doctorID

    const paginatedCases = Object.entries(attentions).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleViewDetails = (caseId) => {
        navigate(`/case/${caseId}`);
    };

    return (
        <div className="doctorAttentionsPage">
            <Header />
            <div className='image_back'>
                    <BackgroundImage
                        src="https://st.depositphotos.com/1907633/1838/i/950/depositphotos_18388775-stock-photo-doctor-with-a-stethoscope-in.jpg"
                        style={{ height: 200, backgroundSize: 'cover' , 
                        backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
                         }}
                    >
                        <h1 style={{color:'white'}}>{t('attentions:tittle')}</h1>
                    </BackgroundImage>
                </div>
            <div className='attention-page' >
                {isLoading ? (
                    <Loader size="xl" className="centered-loader" />
                ) : (
                    <div className="attentionsContent">
                        {paginatedCases.length > 0 ? (
                            <>
                                {paginatedCases.map(([caseId, caseData]) => (
                                    <Card key={caseId} shadow="sm" padding="lg" radius="md" withBorder className="attention-card">
                                        <Card.Section withBorder inheritPadding py="xs">
                                            <Text weight={500}>{t("attentions:case")}: {caseId}</Text>
                                        </Card.Section>
                                        <Text size="sm" mt="sm"><b>{t("attentions:date")}:</b> {caseData.date}</Text>
                                        <Text size="sm"><b>{t("attentions:time")}:</b> {caseData.time}</Text>
                                        <Text size="sm"><b>{t("attentions:patient")}:</b> {caseData.patientID}</Text>
                                        <Text size="sm"><b>{t("attentions:image")}:</b> {caseData.nameImage}</Text>
                                        <Button 
                                            variant="light" 
                                            color="blue" 
                                            fullWidth 
                                            mt="md" 
                                            radius="md"
                                            onClick={() => handleViewDetails(caseId)}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </Card>
                                ))}
                                <Pagination
                                    total={Math.ceil(Object.keys(attentions).length / ITEMS_PER_PAGE)}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    boundaries={1}
                                    siblings={1}
                                    mt="xl"
                                />
                            </>
                        ) : (
                            <Text>No se encontraron atenciones para este doctor.</Text>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Attentions;