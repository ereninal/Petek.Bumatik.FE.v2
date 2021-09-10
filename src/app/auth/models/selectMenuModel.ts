import { SelectedAutomatItem } from "./selectedAutomatItem";

export interface SelectedMenuModel{
    studentId:number;
    menuId:string;
    useDate:Date;
    menuItems:SelectedAutomatItem[]
}