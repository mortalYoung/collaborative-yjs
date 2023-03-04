import useSWR from "swr";

const getFetcher = <T extends Record<string, any>>(url: string) =>
  fetch(url, { method: "get" }).then<T>((res) => res.json());

const postFetcher = <T extends Record<string, any>>(url: string) =>
  fetch(url, { method: "POST" }).then<T>((res) => res.json());

export const useGet = <T extends Record<string, any>>(url: string) =>
  useSWR<T>(url, getFetcher);

export const usePost = <T extends Record<string, any>>(url: string) =>
  useSWR<T>(url, postFetcher);
