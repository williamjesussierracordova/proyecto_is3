import { Container, Title, Text, Grid, Card, Button } from '@mantine/core';
import { MdEmail, MdPhone, MdLocationOn, MdCode, MdHelpOutline } from 'react-icons/md';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './contact.css';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const {t} = useTranslation();
  return (
    <div className="contact-page">
      <Header />
      <Container size="lg" py="xl">
        <Title order={1} align="center" mb="xl">{t('contact:tittle')}</Title>
        
        <Grid gutter="xl">
          <Grid.Col xs={12} md={4}>
            <Card shadow="sm" p="lg">
              <Title order={3} mb="md">{t('contact:contact1')}</Title>
              <Text><MdEmail size={18} /> info@breastcancerclinic.com</Text>
              <Text><MdPhone size={18} /> +1 (555) 123-4567</Text>
              <Text><MdLocationOn size={18} /> 123 Health Street, Medical City, MC 12345</Text>
              <a href='mailto:info@breastcancerclinic.com'>
              <Button variant="light" color="blue" fullWidth mt="md">
                {t('contact:button1')}
              </Button>
              </a>
            </Card>
          </Grid.Col>
          
          <Grid.Col xs={12} md={4}>
            <Card shadow="sm" p="lg">
              <Title order={3} mb="md">{t('contact:contact2')}</Title>
              <Text><MdCode size={18} /> {t('contact:c2subtittle')}</Text>
              <Text>{t('contact:c2explain')}</Text>
              <Text><MdEmail size={18} /> dev@breastcancerapp.com</Text>
              <a href='mailto:dev@breastcancerapp.com'>
              <Button variant="light" color="cyan" fullWidth mt="md">
                {t('contact:button2')}
              </Button>
              </a>
            </Card>
          </Grid.Col>
          
          <Grid.Col xs={12} md={4}>
            <Card shadow="sm" p="lg">
              <Title order={3} mb="md">{t('contact:contact3')}</Title>
              <Text><MdHelpOutline size={18} />{t('contact:c2subtittle')}</Text>
              <Text>{t('contact:c2explain')}</Text>
              <Text><MdEmail size={18} /> support@breastcancerapp.com</Text>
              <Text><MdPhone size={18} /> +1 (555) 987-6543</Text>
              <a href='mailto:support@breastcancerapp.com'>
              <Button variant="light" color="green" fullWidth mt="md">
                {t('contact:button3')}
              </Button>
              </a>
            </Card>
          </Grid.Col>
        </Grid>
        
      </Container>
      <Footer />
    </div>
  );
};

export default ContactPage;