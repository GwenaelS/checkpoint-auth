import db from "../config/db.ts";
import type IUser from "../types/IUser.ts";

export default class userModel {
    // Méthode qui récupère tous les users de la table users
    static async getAllUsers () {
        // Essaie de...
        try {
            const rows = await db.query("select * from users");
            return rows;
        } 
        // Sinon...
        catch (error){
            return error;
        }
    }

    // Méthode qui récupère un utilisateur via un email
    static async getUserByEmail (user: IUser) {
        try {
            const rows = await db.query("select * from users where email = ?", 
                [user.email]
            );
        } 
        catch (error) {

        }
    }

    // Méthode qui crée un nouvel utilisateur
    static async createUser (user : IUser) {
        try {
            const rows = await db.query("insert into users(email, firstname, lastname, password) values (?,?,?,?)", 
                [user.email, user.firstname, user.lastname, user.password]);
            return rows;
        } 
        catch (error) {
            return error;
        }
    }



    // async update () {

    // }
    // async delete () {

    // }



}