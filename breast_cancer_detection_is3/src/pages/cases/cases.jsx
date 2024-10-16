import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Grid, Card, Text, Image, Badge, Button, Textarea, Group } from '@mantine/core';
import { MdCalendarToday, MdAccessTime, MdPerson, MdLocalHospital, MdCheck, MdClose } from 'react-icons/md';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { readCases, updateCaseValidation, updateCasePrediction } from "../../firebase/casesController";
import { downloadImage } from "../../firebase/imageController";
import LoaderPage from "../loader/loader";
import './cases.css';
import { NativeSelect } from "@mantine/core";
import { readCasesByPatient } from "../../firebase/casesController";
import axios from 'axios';
import { Loader } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Alert } from '@mantine/core';
import { GoAlertFill } from "react-icons/go";


const Cases = () => {
    const { idCase } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [doctorComment, setDoctorComment] = useState("");
    const [validationStatus, setValidationStatus] = useState(null);
    const [cases, setCases] = useState([]);
    const [image_other_case, setImageOtherCase] = useState("");
    const [other_case, setOtherCase] = useState("");
    const [other_case_data, setOtherCaseData] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionLabel, setPredictionLabel] = useState(null);
    const [isLoadingCompare, setIsLoadingCompare] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [alert, setAlert] = useState(false);
    
    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readCases(idCase);
                setCaseData(data);
                setDoctorComment(data.doctorComment || "");
                setValidationStatus(data.validationStatus);
                setPredictionLabel(data.predictionClass)
                setPredictionResult(data.predictionAccuracy)
                const url = await downloadImage(data.patientID, data.nameImage);
                setImageUrl(url);
                const casesData = await readCasesByPatient(data.patientID);
                const casesArray = Object.entries(casesData).map(([id]) => ({
                    value: id,
                  }));
                setCases(casesArray);
                if(data.predictionAccuracy >= 0.9 && data.predictionClass === 'Cancer'){
                    setAlert(true);
                }
            } catch (error) {
                console.error("Error loading case data:", error);
            } finally {
                    setLoading(false);
            }
        };
        fetchData();
    }, [idCase]);

    useEffect(() => {
        if (predictionLabel === undefined) {
            prediction();
        }
    }, [imageUrl]);

    const handleValidation = async (isValid) => {
        try {
            await updateCaseValidation(idCase, isValid, doctorComment);
            setValidationStatus(isValid);
            alert("Case validation updated successfully");
        } catch (error) {
            console.error("Error updating case validation:", error);
            alert("Failed to update case validation");
        }
    };

    const search_image = async (case_select) => {
        setIsLoadingSearch(true);
        try {
            const data = await readCases(case_select);
            setOtherCaseData(data);
            const url = await downloadImage(data.patientID, data.nameImage);
            console.log(url);
            setImageOtherCase(url);
            setHasSearched(true);
            setIsLoadingSearch(false);
        } catch (error) {
            console.error("Error loading case data:", error);
            alert("Failed to load case data");
            setIsLoadingSearch(false);
        }
    };

    const prediction = async() => {
        if(!imageUrl) {
            alert('Please provide an image URL.');
            return;
        }

        try{
            const response = await axios.post('https://009c-38-25-10-179.ngrok-free.app/predict', {
                image_url: imageUrl,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
            console.log(response.data.confidence); // prediction confidence
            console.log(response.data.prediction); // label - cancer, no_cancer
            setPredictionResult(response.data.confidence);
            setPredictionLabel(response.data.prediction);
            updateCasePrediction(idCase, response.data.prediction, response.data.confidence);
            if(response.data.confidence >= 0.9 && response.data.prediction === 'Cancer'){
                setAlert(true);
            }
        } catch (error) {
            console.error('Error with the prediction:', error);
        }
    };

    const handleCompare = async () => {
        setIsLoadingCompare(true);
        if (!imageUrl || !image_other_case) {
          alert('Please provide both image URLs.');
          return;
        }
      
        try {
          const response = await axios.post('https://api-compare-images.onrender.com/compare', {
            image_url1: imageUrl,
            image_url2: image_other_case, // Cambiado de image_url2 a image_other_case
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
            responseType: 'blob',
          });
      
          const imageBlob = response.data;
          const resultImageUrl = URL.createObjectURL(imageBlob);
          setResultImage(resultImageUrl);
          setIsLoadingCompare(false);
        } catch (error) {
            console.error('Error comparing images:', error);
            alert('Error comparing images');
            setIsLoadingCompare(false);
        }
      };

    if (loading) {
        return <LoaderPage />;
    }

    return (
        <div className="cases-page">
            <Header />
            <Container size="lg" py="xl">
                <Title order={1} align="center" mb="xl">{t('case:tittle')}</Title>
                {caseData ? (
                    <Grid>
                        <Grid.Col xs={12} md={6}>
                            <Card shadow="sm" p="lg">
                                <Title order={2} mb="md">{t('case:subtitle1')}</Title>
                                <Text size="lg" mb="xs"><strong>{t('case:case')}:</strong> {idCase}</Text>
                                <Text mb="xs"><MdCalendarToday className="icon" /> <strong>{t('case:date')}:</strong> {caseData.date}</Text>
                                <Text mb="xs"><MdAccessTime className="icon" /> <strong>{t('case:time')}:</strong> {caseData.time}</Text>
                                <Text mb="xs"><MdLocalHospital className="icon" /> <strong>{t('case:doctor')}:</strong> {caseData.doctorID}</Text>
                                <Text mb="xs"><MdPerson className="icon" /> <strong>{t('case:patient')}:</strong> {caseData.patientID}</Text>
                                <Badge color={validationStatus === "Validated" ? "green" : "red" } size="lg" mt="md">{t('case:status')}: {validationStatus === undefined ? t('case:pending') : (validationStatus ? t('case:validated') : t('case:invalidated'))}</Badge>
                            </Card>
                        </Grid.Col>
                        <Grid.Col xs={12} md={6}>
                            <Card shadow="sm" p="lg">
                                <Title order={2} mb="md">{t('case:subtitle2')}</Title>
                                <div>
                                    <Image
                                        src={imageUrl}
                                        alt="Case Image"
                                        fit="contain"
                                        height={300}
                                        withPlaceholder
                                        placeholder={<Text align="center">No image available</Text>}
                                    />
                                </div>
                                <Text mt="md"><strong>{t('case:imageName')}:</strong> {caseData.nameImage}</Text>
                                <div className="badges_prediction" >
                                    <Badge className="badge_pred" color="yellow" size="lg" mt="md" >{t('case:prediction')}: {predictionLabel=== undefined ? 'In Progress' : predictionLabel}</Badge> 
                                    <Badge className="badge_pred" color="blue" size="lg" mt="md">{t('case:accuracy')}: {predictionResult=== undefined ? 'In Progress' : predictionResult}</Badge> 
                                </div>
                                { 
                                    alert &&
                                    <Alert variant="filled" color="red" radius="lg" title={"Atención Inmediata"} icon={<GoAlertFill />}>
                                        La predición indica un alto indice de cancer (mayor a 90%) por lo cual se recomienda una revisión inmediata.
                                    </Alert>
                                }
                                
                                {/* <Button color="blue" fullWidth radius={'lg'} onClick={prediction} >Predict Image with AI</Button> */}
                            </Card>
                        </Grid.Col>
                        <Grid.Col xs={12} md={6}>
                            <Card shadow="sm" p="lg">
                                <Title order={2} mb="md">{t('case:subtitle3')}</Title>
                                <NativeSelect 
                                    value={other_case}
                                    onChange={(event) => setOtherCase(event.currentTarget.value)}
                                    radius="lg" description={t('case:other_cases_placeholder1')} 
                                    data={[''].concat(cases)} style={{width: '100%'}} >
                                    <option value="" disabled>{t('case:other_cases_placeholder2')}</option>
                                    {cases.map((caseItem) => (
                                        <option key={caseItem.value} value={caseItem.value}>{caseItem.value}</option>
                                    ))}
                                    </NativeSelect>

                                <Button color="blue" fullWidth radius={'lg'} onClick={() => search_image(other_case)} >
                                    {isLoadingSearch ? <Loader color="white" size="lg" type="dots" /> : t('case:search_case')}
                                </Button>
                                {hasSearched && (
                                    <>
                                    <div style={{paddingBlock:'1rem'}}>
                                        <Image
                                        src={image_other_case}
                                        alt="Case Image"
                                        fit="contain"
                                        height={300}
                                        withPlaceholder
                                        placeholder={<Text align="center">No image available</Text>}
                                        />
                                    </div>
                                    <Text size="lg" mb="xs"><strong>{t('case:case')}:</strong> {other_case_data.caseID || "N/A"}</Text>
                                    <Text mb="xs"><MdCalendarToday className="icon" /> <strong>{t('case:date')}:</strong> {other_case_data.date}</Text>
                                    <Text mb="xs"><MdAccessTime className="icon" /> <strong>{t('case:time')}:</strong> {other_case_data.time}</Text>
                                    <Text mb="xs"><MdLocalHospital className="icon" /> <strong>{t('case:doctor')}:</strong> {other_case_data.doctorID}</Text>
                                    <Text mb="xs"><MdPerson className="icon" /> <strong>{t('case:patient')}:</strong> {other_case_data.patientID}</Text>
                                    <Text mb="xs"><strong>{t('case:imageName')}:</strong>{other_case_data.nameImage}</Text>
                                    </>
                                )}   
                            </Card>
                        </Grid.Col>
                        {hasSearched && (
                            <>
                            <Grid.Col xs={12} md={6}>
                                <Card shadow="sm" p="lg">
                                    <Title order={2} mb="md">{t('case:subtitle4')}</Title>
                                    <div className="compare_images">
                                        <div className="compare_image1">
                                            <Image 
                                                src={imageUrl}
                                                alt="Case Image"
                                                fit="contain"
                                                height={300}
                                                withPlaceholder
                                                placeholder={<Text align="center">No image available</Text>}
                                            />
                                        </div>
                                        <div className="compare_image2">
                                            <Image 
                                                src={image_other_case}
                                                alt="Case Image"
                                                fit="contain"
                                                height={300}
                                                withPlaceholder
                                                placeholder={<Text align="center">No image available</Text>}
                                            />
                                        </div>
                                    </div>
                                    <Button color="blue" fullWidth radius={'lg'} onClick={handleCompare} >
                                        {isLoadingCompare ? <Loader color="white" size="lg" type="dots" /> : t('case:buttonCompare')}
                                    </Button>
                                    {resultImage && (
                                        <div style={{paddingBlock:'1rem'}}>
                                            <Title order={2} mb="md">{t('case:subtitle6')}</Title>
                                            <Image 
                                                src={resultImage}
                                                alt="Comparison Result"
                                                fit="contain"
                                                height={300}
                                                withPlaceholder
                                                placeholder={<Text align="center">No image available</Text>}
                                            />
                                        </div>
                                    )}
                                </Card>
                            </Grid.Col>
                            </>
                        )}   
                        <Grid.Col xs={12}>
                            <Card shadow="sm" p="lg">
                                <Title order={2} mb="md">{t('case:subtitle5')}</Title>
                                <Textarea
                                    placeholder={t('case:comentsPlaceholder')}
                                    label={t('case:comentsDoctor')}
                                    value={doctorComment}
                                    onChange={(event) => setDoctorComment(event.currentTarget.value)}
                                    minRows={4}
                                    mb="md"
                                    disabled={validationStatus !== undefined}
                                />
                                <Group position="apart">
                                    <Button 
                                        leftIcon={<MdCheck />} 
                                        color="green" 
                                        onClick={() => handleValidation(true)}
                                        disabled={validationStatus !== undefined}
                                    >
                                        {t('case:validateAnalisis')}
                                    </Button>
                                    <Button 
                                        leftIcon={<MdClose />} 
                                        color="red" 
                                        onClick={() => handleValidation(false)}
                                        disabled={validationStatus !== undefined}
                                    >
                                        {t('case:invalidAnalisis')}
                                    </Button>
                                </Group>
                            </Card>
                        </Grid.Col>
                    </Grid>
                ) : (
                    <Text align="center" size="xl">No data available for this case.</Text>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default Cases;