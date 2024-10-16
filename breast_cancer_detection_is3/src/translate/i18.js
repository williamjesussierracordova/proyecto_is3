// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          "welcome": "Bienvenido",
          "changeLanguage": "Cambiar idioma"
        },
        header:{
          "about":"Sobre Nosotros",
          "home":"Inicio",
          "contact":"Contacto",
          "attentions":"Atenciones",
          "search":"Buscar"
        },
        home:{
          "tittle":"Detección de Cáncer de Mama",
          "explain":"Este proyecto tiene como objetivo ayudar en la detección temprana del cáncer de mama a través del análisis de mamografías utilizando algoritmos de aprendizaje automático.",
          "subtittle1":"Información del paciente",
          form:{
            "label":"DNI del paciente",
            "placeholder":"Ingrese el DNI del paciente",
            "button":"Buscar"
          },
          information:{
            "tittle":"Información del paciente",
            "name":"Nombre completo",
            "age":"Edad",
            "gender":"Género",
            "phone":"Teléfono",
            "email":"Correo electrónico",
            "patientID":"DNI del paciente"
          },
          "file":"Seleccionar imagen",
          "subtittle2":"Previsualización",
          "noimage":"No se ha seleccionado ninguna imagen",
          "upload":"Subir imagen",
        },
        footer: {
            "follow": "Síguenos",
            "contact": "Contáctanos",
            "rights": "Todos los derechos reservados",
            "email": "Correo",
            "phone": "Teléfono",
        },
        contact: {
          "tittle":"Información de Contacto",
          "contact1":"Contacto de la Clínica",
          "button1":"Contactar Clínica",
          "contact2":"Desarrolladores",
          "c2subtittle":"Equipo de Desarrollo",
          "c2explain":"Para consultas relacionadas con la funcionalidad de la aplicación:",
          "button2":"Contactar Desarrolladores",
          "contact3":"Soporte Técnico",
          "c3subtittle":"Help Desk",
          "c3explain":"Para problemas técnicos o soporte al usuario:",
          "button3":"Obtener Soporte",
        },
        about:{
          "tittle":"Sobre Detección de Cáncer de Mama",
          "explain":"Detección de Cáncer de Mama es una innovadora herramienta de software diseñada para ayudar a los profesionales médicos en la detección temprana del Carcinoma Ductal Invasivo (IDC), el tipo más común de cáncer de mama. Desarrollado por un equipo de dedicados estudiantes de ingeniería de software de la Universidad San Ignacio de Loyola en Lima, Perú, este proyecto tiene como objetivo revolucionar la forma en que se detecta y diagnostica el cáncer de mama.",
          "subtittle1":"Cómo Funciona",
          "explain1":"Nuestro software utiliza técnicas avanzadas de visión por computadora para analizar histogramas de tejido mamario. Estas imágenes son procesadas a través de un sistema pre-entrenado que ha sido educado en una vasta base de datos de casos validados por expertos. Este enfoque permite una detección rápida e instantánea, reduciendo significativamente el tiempo requerido para las evaluaciones iniciales.",
          "subtittle2":"Características Clave",
          "key1":"Alta Precisión",
          "k1explain":"Nuestro modelo actual cuenta con una precisión máxima del 78% en nuestra matriz de confusión, proporcionando evaluaciones iniciales confiables.",
          "key2":"Detección Rápida",
          "k2explain":"Análisis instantáneo de histogramas mamarios, ahorrando tiempo valioso en el proceso de diagnóstico.",
          "key3":"Aprendizaje Continuo",
          "k3explain":"El algoritmo está diseñado para aprender y mejorar a partir de la entrada profesional, asegurando una mejora continua de sus capacidades de detección.",
          "key4":"Herramienta de Soporte",
          "k4explain":"Actúa como una herramienta de asistencia para los profesionales médicos, complementando su experiencia en lugar de reemplazarla.",
          "key5":"Fácil de Usar",
          "k5explain":"Interfaz intuitiva diseñada para facilitar su uso en entornos clínicos.",
          "subtittle3":"Nuestra Visión",
          "explain3":"Si bien actualmente alcanzamos una precisión del 78%, reconocemos la necesidad de un mayor refinamiento antes de la implementación clínica completa. Nuestro software sirve como una herramienta de apoyo, ayudando a los profesionales médicos en su proceso de diagnóstico. En casos de discrepancia, la entrada de los proveedores de atención médica ayuda a entrenar y mejorar aún más el algoritmo, creando una relación sinérgica entre la experiencia humana y la inteligencia artificial.",
          "subtittle4":"Especificaciones Técnicas",
          "explain4":"El software de Detección de Cáncer de Mama se encuentra actualmente alojado en un servidor basado en la nube, que almacena tanto las imágenes de análisis como una base de datos que contiene información del paciente y del médico. Esta configuración proporciona la infraestructura mínima necesaria para su funcionamiento, haciéndolo accesible para diversas instalaciones médicas.",
          "subtittle5":"Desarrollos Futuros",
          "explain5":"Nuestro plan de trabajo incluye extensas pruebas en entornos académicos para validar y mejorar aún más el rendimiento del software. Después de esta fase, apuntamos a refinar el algoritmo para su implementación en entornos clínicos. Esta aplicación en el mundo real no solo proporcionará una valiosa asistencia a los profesionales médicos, sino que también permitirá que el algoritmo continúe aprendiendo y mejorando a través del uso continuo y la retroalimentación.",
          "subtittle6":"Antecedentes de Investigación",
          "explain6":"Si bien nuestro proyecto se basa en documentos de investigación de 2022 que detallan procesos similares, estamos pionerando la aplicación práctica de estas teorías. A medida que avanzamos, nos comprometemos a pruebas y validaciones rigurosas para garantizar la confiabilidad y efectividad de nuestro software en escenarios médicos del mundo real.", 
          "explain6_2":"Detección de Cáncer de Mama es un proyecto nacido de la pasión y dedicación de estudiantes de ingeniería de software, con el objetivo de tener un impacto significativo en el campo de los diagnósticos médicos. Estamos comprometidos con la mejora continua y la colaboración con profesionales médicos para crear una herramienta que realmente pueda marcar la diferencia en la detección del cáncer de mama y los resultados de los pacientes."
        },
        attentions:{
          "tittle":"Historial de Atenciones",
          "doctor":"Id Doctor",
          "date":"Dia",
          "time":"Hora",
          "patient":"Id Paciente",
          "image":"Imagen",
          "case":"Caso",
        },
        search:{
          "tittle":"Atenciones por paciente",	
          "date":"Fecha",
          "time":"Hora",
          "doctor":"Id Doctor",
          "patient":"Id Paciente",
          "image":"Imagen",
          "case":"Caso",
          "details":"Ver Detalles"
        },case:{
          "tittle":"Detalles del Caso",
          "subtitle1":"Información del Caso",
          "subtitle2":"Análisis de la Imagen",
          "subtitle3":"Otros Casos",
          "subtitle4":"Comparar Imágenes",
          "subtitle5":"Validación del Doctor",
          "date":"Fecha",
          "time":"Hora",
          "doctor":"Id Doctor",
          "patient":"Id Paciente",
          "case":"Id Caso",
          "status"  :"Estado",
          "pending": "Pendiente de Revisión",
          "validated": "Validado",
          "invalidated": "Invalidado",
          "imageName":"Nombre de la Imagen",
          "prediction":"Predicción",
          "accuracy":"Precisión",
          "other_cases_placeholder1":"Otros casos del paciente",
          "other_cases_placeholder2":"Seleccione un caso",
          "search_case":"Buscar Caso",
          "comentsDoctor":"Comentarios del Doctor",
          "comentsPlaceholder":"Ingrese sus comentarios sobre el caso y la detección",
          "validateAnalisis":"Validar Análisis",
          "invalidAnalisis":"Invalidar Análisis",
          "buttonCompare":"Comparar Imágenes con AI",
          "subtitle6":"Resultado de la comparación",
        }
      },
      en: {
        translation: {
          "welcome": "Welcome",
          "changeLanguage": "Change language"
        },
        header:{
            "about":"About it",
            "home":"Home",
            "contact":"Contact",
            "attentions":"Attentions",
            "search":"Search"
        },
        home:{
          "tittle":"Breast Cancer Detection",
          "explain":"This project aims to assist in the early detection of breast cancer through the analysis of mammograms using machine learning algorithms.",
          "subtittle1":"Patient Information",
          form:{
            "label":"Patient's ID",
            "placeholder":"Enter the patient's ID",
            "button":"Search"
          },
          information:{
            "tittle":"Patient's Information",
            "name":"Full Name",
            "age":"Age",
            "gender":"Gender",
            "phone":"Phone",
            "email":"Email",
            "patientID":"Patient's ID"
          },
          "file":"Select image",
          "subtittle2":"Image Preview",
          "noimage":"No image selected",
          "upload":"Upload image",
        },
        footer: {
            "follow": "Follow Us",
            "contact": "Contact Us",
            "rights": "All rights reserved",
            "email": "Email",
            "phone": "Phone",
        },
        contact: {
          "tittle":"Contact Information",
          "contact1":"Clinic Contact",
          "button1":"Contact Clinic",
          "contact2":"Developers",
          "c2subtittle":"Development Team",
          "c2explain":"For inquiries related to the application's functionality:",
          "button2":"Contact Developers",
          "contact3":"Technical Support",
          "c3subtittle":"Help Desk",
          "c3explain":"For technical issues or user support:",
          "button3":"Get Support",
        },
        about:{
          "tittle":"About Breast Cancer Detection",
          "explain":"Breast Cancer Detection is an innovative software tool designed to assist medical professionals in the early detection of Invasive Ductal Carcinoma (IDC), the most common type of breast cancer. Developed by a team of dedicated software engineering students from Universidad San Ignacio de Loyola in Lima, Peru, this project aims to revolutionize the way breast cancer is detected and diagnosed.",
          "subtittle1":"How It Works",
          "explain1":"Our software utilizes advanced computer vision techniques to analyze histograms of breast tissue. These images are processed through a pre-trained system that has been educated on a vast database of expert-validated cases. This approach allows for rapid and instantaneous detection, significantly reducing the time required for initial assessments.",
          "subtittle2":"Key Features",
          "key1":"High Accuracy",
          "k1explain":"Our current model boasts a peak accuracy of 78% in our confusion matrix, providing reliable initial assessments.",
          "key2":"Rapid Detection",
          "k2explain":"Instant analysis of breast histograms, saving valuable time in the diagnostic process.",
          "key3":"Continuous Learning",
          "k3explain":"The algorithm is designed to learn and improve from professional input, ensuring ongoing enhancement of its detection capabilities.",
          "key4":"Support Tool",
          "k4explain":"Acts as an assistive tool for medical professionals, complementing their expertise rather than replacing it.",
          "key5":"User-Friendly",
          "k5explain":"Intuitive interface designed for ease of use in clinical settings.",
          "subtittle3":"Our Vision",
          "explain3":"While currently achieving 78% accuracy, we recognize the need for further refinement before full clinical implementation. Our software serves as a supportive tool, assisting medical professionals in their diagnostic process. In cases of discrepancy, the input from healthcare providers helps to further train and improve the algorithm, creating a synergistic relationship between human expertise and artificial intelligence.",
          "subtittle4":"Technical Specifications",
          "explain4":"The Breast Cancer Detection software is currently hosted on a cloud-based server, which stores both the analysis images and a database containing patient and physician information. This setup provides the minimum necessary infrastructure for operation, making it accessible for various medical facilities.",
          "subtittle5":"Future Developments",
          "explain5":"Our roadmap includes extensive testing in academic environments to further validate and improve the software's performance. Following this phase, we aim to refine the algorithm for deployment in clinical settings. This real-world application will not only provide valuable assistance to medical professionals but also allow the algorithm to continue learning and improving through ongoing use and feedback.",
          "subtittle6":"Research Background",
          "explain6":"While our project is grounded in research papers from 2022 detailing similar processes, we are pioneering the practical application of these theories. As we move forward, we are committed to rigorous testing and validation to ensure the reliability and effectiveness of our software in real-world medical scenarios.",
          "explain6_2":"Breast Cancer Detection is a project born from the passion and dedication of software engineering students, aiming to make a significant impact in the field of medical diagnostics. We are committed to continuous improvement and collaboration with medical professionals to create a tool that can truly make a difference in breast cancer detection and patient outcomes."
        },
        attentions:{
          "tittle":"History of Care",
          "doctor":"Id Doctor",
          "date":"Date",
          "time":"Time",
          "patient":"Id Patient",
          "image":"Image",
          "case":"Case",
        },
        search:{
          "tittle":"Patient's Attentions",	
          "date":"Date",
          "time":"Time",
          "doctor":"Id Doctor",
          "patient":"Id Patient",
          "image":"Image",
          "case":"Case",
          "details":"View Details"
        },
        case:{
          "tittle":"Case Details",
          "subtitle1":"Case Information",
          "subtitle2":"Image Analysis",
          "subtitle3":"Other Cases",
          "subtitle4":"Compare Images",
          "subtitle5":"Doctor's Validation",
          "date":"Date",
          "time":"Time",
          "doctor":"Doctor ID",
          "patient":"Patient ID",
          "case":"Case ID",
          "status"  :"Status",
          "pending": "Pending Review",
          "validated": "Validated",
          "invalidated": "Invalidated",
          "imageName":"Image Name",
          "prediction":"Prediction",
          "accuracy":"Accuracy",
          "other_cases_placeholder1":"Other cases of the patient",
          "other_cases_placeholder2":"Select a case",
          "search_case":"Search Case",
          "comentsDoctor":"Doctor's Comments",
          "comentsPlaceholder":"Enter your comments about the case and detection",
          "validateAnalisis":"Validate Analysis",
          "invalidAnalisis":"Invalidate Analysis",
          "buttonCompare":"Compare Images with AI",
          "subtitle6":"Result of the comparison",
        }
      }
    },
    lng: "es", // idioma por defecto
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;



export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};