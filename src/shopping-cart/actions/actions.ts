//Aqui puedo crear las acciones o hacerme un endpoint para ellas

import { getCookie, hasCookie, setCookie } from "cookies-next";

//las dos acciones son validas
//1- ) Accion ==> creo aqui una funcion 'use service' que interactue con la api
//2- ) Endpoint + funcion  ==> creo un endpoint y una funcion que llame a al endpoint

//! Sera llamado en un componente 'use client'
/* 
  {
    'id-21212': 4,
    'id-76878': 2,
    'id-194re': 1,
  }
*/
export const getCookiesCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookiesCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookiesCart;
  }
  return {};
};

export const addToCart = (id: string) => {
  const cookiesCart = getCookiesCart();

  if (cookiesCart[id]) {
    cookiesCart[id] = cookiesCart[id] + 1;
  } else {
    cookiesCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookiesCart));
};

export const removeFromCart = (id: string) => {
  const cookiesCart = getCookiesCart();
  if (cookiesCart[id]) {
    delete cookiesCart[id];
  }
  setCookie("cart", JSON.stringify(cookiesCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookiesCart = getCookiesCart();
  
  /* if(!cookiesCart[id]){
    return
  } */
  
  if(cookiesCart[id] <= 1) {
    delete cookiesCart[id]
    console.log('lo he borrado')
  } else {
    console.log('noooo')
    cookiesCart[id] = cookiesCart[id] - 1;
  }
  
  
  setCookie("cart", JSON.stringify(cookiesCart));
};
