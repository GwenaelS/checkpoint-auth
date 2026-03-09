import type { Request, Response } from "express";
import UserModel from "../model/userModel.ts";
import type IUser from "../types/IUser.ts";

export default class userController {

    // Méthode qui fait appel a UserModel pour récuperer tout les users
    static async getAll (req: Request, res: Response) {
        // Essaie de...
        try {
            const result = await UserModel.getAllUsers() as IUser[]; // Tableau IUser => 
                // récupère plusieurs users (tableau d'objets result qui respecte la structure IUser)
            return res.status(200).json({message: "Action getAllUsers reussi", result});
        }
        // Sinon...
        catch (error) {
            return res.status(500).json({message: "Erreur de getAllUsers", error});
        }
    }

    // Méthode qui fait appel a UserModel pour récuprer un utilisateur via un email
    static async getByEmail (req: Request, res: Response) {
        try {
            if(!req.body){
                return res.status(400).json({message: "Saisis manquantes"});
            } else {
                const result = await UserModel.getUserByEmail(req.body.email);
                return res.status(200).json({message: "Action getByEmail reussi", result})
            }
        }
        catch (error) {
            return res.status(500).json({message: "Erreur de getAllUsers", error});
        }
    }

    // Méthode qui fait appel a UserModel pour crée un nouvel utilisateur
    static async create (req: Request, res: Response) {
        // Essaie de...

        // Pour créer un nouvel utilisateur :
        // Vérification que la requète n'est pas vide
        // Vérification que l'email de la requète n'existe pas déja en bdd
            // Si elle n'existe pas :
                // On peut inserer l'utilisateur
            // Si elle existe :
                // Erreur

        try {
            const result = await UserModel.createUser() as IUser;
            return res.status(200).json({message: "Action create reussi", result});
        }
        // Sinon...
        catch (error) {
            return res.status(500).json({message: "Erreur de create", error});
        }
    }
}