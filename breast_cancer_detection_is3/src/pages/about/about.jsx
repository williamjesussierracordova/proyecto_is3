import React from 'react';
import { Container, Title, Text, Space, List, ThemeIcon } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './about.css';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const {t} = useTranslation();
  return (
    <div className="about-page">
      <Header />
      <Container size="lg" py="xl">
        <Title order={1} align="center" mb="xl">{t("about:tittle")}</Title>

        <Text size="lg" mb="md">
          {t("about:explain")}
        </Text>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle1")}</Title>
        <Text>
          {t("about:explain1")}
        </Text>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle2")}</Title>
        <List
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <MdCheckCircle size={16} />
            </ThemeIcon>
          }
        >
          <List.Item><b>{t("about:key1")}:</b> {t("about:k1explain")}</List.Item>
          <List.Item><b>{t("about:key2")}:</b> {t("about:k2explain")}</List.Item>
          <List.Item><b>{t("about:key3")}:</b> {t("about:k3explain")}</List.Item>
          <List.Item><b>{t("about:key4")}:</b> {t("about:k4explain")}</List.Item>
          <List.Item><b>{t("about:key5")}:</b> {t("about:k5explain")}</List.Item>
        </List>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle3")}</Title>
        <Text>
          {t("about:explain3")}
        </Text>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle4")}</Title>
        <Text>
          {t("about:explain4")}
        </Text>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle5")}</Title>
        <Text>
          {t("about:explain5")}
        </Text>

        <Title order={2} mt="xl" mb="md">{t("about:subtittle6")}</Title>
        <Text>
          {t("about:explain6")}
        </Text>

        <Space h="xl" />

        <Text italic>
          {t("about:explain6_2")}
        </Text>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutPage;