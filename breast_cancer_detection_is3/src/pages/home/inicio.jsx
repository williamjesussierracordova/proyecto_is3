import { useState } from "react";
import Footer from "../../components/footer.jsx";
import Header from "../../components/header.jsx";
import { FileInput, Button, Input } from "@mantine/core";
import { uploadImage } from "../../firebase/imageController.js";
import { v4 } from "uuid";
import './inicio.css';
import { readPatient } from "../../firebase/patientController.js";
import { validateMedicalCode } from "../validators/validator.js";
import { Loader } from "@mantine/core";
import { writeCases } from "../../firebase/casesController.js";
import { useTranslation } from "react-i18next";
import LoaderPage from "../loader/loader.jsx";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const [file, setFile] = useState(null);
    const [namePatient, setNamePatient] = useState("");
    const [agePatient, setAgePatient] = useState("");
    const [genderPatient, setGenderPatient] = useState("");
    const [phonePatient, setPhonePatient] = useState("");
    const [emailPatient, setEmailPatient] = useState("");
    const [patientID, setPatientID] = useState("");
    const [patientID2, setPatientID2] = useState("");
    const [error, setError] = useState("");
    const [searchImage, setSearchImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showLoadingPage, setShowLoadingPage] = useState(false);
    const now = new Date();
    const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleUpload =  () => {
        setIsUploading(true);
        try {
            if (file) {
                setShowLoadingPage(true); // Mostrar la página de carga
                setTimeout(async () =>  {
                    await uploadImage(file, patientID2, file.name);
                    let code_case = v4();
                    await writeCases(code_case, patientID2, "11111111", date, time, file.name);
                    setIsUploading(false);
                    setShowLoadingPage(false); // Ocultar la página de carga después de 5 segundos
                    alert("Imagen subida correctamente.");
                    navigate(`/case/${code_case}`);
                }, 6000); // Pausa de 10 segundos
            } else {
                setIsUploading(false);
                alert("Por favor, selecciona un archivo primero.");
            }
        } catch (error) {
            setIsUploading(false);
            setShowLoadingPage(false); // Asegurarse de ocultar la página de carga en caso de error
            console.error(error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFile(null);
        try{
            const data = await readPatient(patientID);
            if(data){
                setIsLoading(false);
                setNamePatient(data.firstName + " " + data.secondName + " " + data.firstLastName + " " + data.secondLastName);
                setAgePatient(data.age);
                setGenderPatient(data.gender);
                setPhonePatient(data.phone);
                setEmailPatient(data.email);
                setPatientID2(data.patientID);
                setSearchImage(true);
            }
            else{
                setIsLoading(false);
                setNamePatient("");
                setAgePatient("");
                setGenderPatient("");
                setPhonePatient("");
                setEmailPatient("");
                setPatientID2("");
                alert("Patient not found");
                setSearchImage(false);
            }
        }
        catch(error){
            setIsLoading(false);
            console.error(error);
        }
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setPatientID(value);

        // Validar el campo cuando cambia
        if (!validateMedicalCode(value)) {
            setError('Patient ID not valid');
        } else {
            setError('');
        }
    };

    return (
        <div>
        {showLoadingPage ? <LoaderPage />
        :   
        <div className="home">
            <Header />
            <div className="home-container">
                <div className="home-header">
                    <h1>{t('home:tittle')}</h1>
                    <p>
                        {t('home:explain')}
                    </p>
                </div>
                <div className="home-content">
                    <div className="home-form">
                        <h2>{t('home:subtittle1')}</h2>
                        <form className="home-form-dni" onSubmit={handleSearch}>
                            <Input.Wrapper label={t('home:form:label')} error={error} style={{marginBottom:'0.5rem'}}>
                                <Input placeholder={t('home:form:placeholder')} value={patientID} onChange={handleChange} />
                            </Input.Wrapper>
                            <Button type="submit" color="blue">
                                {isLoading ? <Loader color="white" size="lg" type="dots" /> : t('home:form:button')}
                            </Button>
                        </form>
                        <form className="home-form-info">
                            <Input.Wrapper label={t('home:information:tittle')}>
                                <Input placeholder={t('home:information:name')} disabled  className="form-input" value={namePatient} />
                                <Input placeholder={t('home:information:age')} disabled className="form-input" value={agePatient}/>
                                <Input placeholder={t('home:information:gender')} disabled className="form-input" value={genderPatient}/>
                                <Input placeholder={t('home:information:phone')} disabled className="form-input" value={phonePatient}/>
                                <Input placeholder={t('home:information:email')} disabled className="form-input" value={emailPatient}/>
                                <Input placeholder={t('home:information:patientID')} disabled className="form-input" value={patientID2}/>
                            </Input.Wrapper>
                        </form>
                        <div className="home-form-upload">
                            <FileInput
                                clearable
                                accept="image/png,image/jpeg,image/webp,image/jpg"
                                placeholder={t("home:file")}
                                radius="md"
                                onChange={setFile}
                                value={file}
                                disabled={!searchImage}
                            />
                        </div>
                    </div>
                    <div className="home-preview">
                        <h2>{t("home:subtittle2")}</h2>
                        <div className="home-preview-image">
                            {file && (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="preview-img"
                                />
                            )}
                            {!file && (
                                <p>{t("home:noimage")}</p>
                            )}
                        </div>
                        <div className="home-upload" style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',marginTop:'2rem'}}>
                            <Button onClick={handleUpload} disabled={!file || !searchImage} style={{width:'100%'}}>
                                {isUploading ? <Loader color="white" size="lg" type="dots" /> : t("home:upload")}	
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>}
        </div>
    )
}

export default Inicio;