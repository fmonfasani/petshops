import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import AdminProductsActions from "./AdminProductsActions";

import { action } from "@storybook/addon-actions";

// Configuración de Storybook para el componente
export default {
  title: "Components/AdminProductsActions",
  component: AdminProductsActions,
  argTypes: {
    id: { control: "text" },
    onDeleteNotification: { action: "onDeleteNotification" },
    onErrorNotification: { action: "onErrorNotification" },
    onDeleteProduct: { action: "onDeleteProduct" },
  },
} as Meta;

// Plantilla base para las historias
const Template: StoryFn<AdminProductsActionsProps> = (args) => (
  <AdminProductsActions {...args} />
);

// Historia básica de ejemplo para el componente AdminProductActions
export const Default = Template.bind({});
Default.args = {
  id: "product-id-1234",
  onDeleteNotification: action("Producto eliminado"),
  onErrorNotification: action("Error en operación"),
  onDeleteProduct: action("Producto eliminado del estado"),
};

// Historia para mostrar la edición de un producto
export const EditingProduct = Template.bind({});
EditingProduct.args = {
  id: "product-id-5678",
  onDeleteNotification: action("Producto actualizado con éxito"),
  onErrorNotification: action("Error al actualizar el producto"),
  onDeleteProduct: action("Producto actualizado"),
};

// Historia para simular la eliminación de un producto
export const DeleteConfirmation = Template.bind({});
DeleteConfirmation.args = {
  id: "product-id-9876",
  onDeleteNotification: action("Producto eliminado"),
  onErrorNotification: action("Error en eliminación"),
  onDeleteProduct: action("Producto eliminado"),
};
