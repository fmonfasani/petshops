/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
import React from "react";
import { Meta, Story } from "@storybook/react"; // Importar Meta y Story de Storybook
import AboutU from "./AboutU"; // Importar el componente AboutU

// Definir metadata para el componente
export default {
  title: "Components/AboutU",
  component: AboutU,
} as Meta;
const Template: Story = (args) => <AboutU {...args} />;
export const Default = Template.bind({});
Default.args = {};
