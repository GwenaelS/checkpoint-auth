import type { Request, Response } from "express";
import userModel from "../model/userModel.ts";
import type IUser from "../types/IUser.ts";
import argon2 from "argon2";

export default class userController {

    // Méthode qui fait appel a UserModel pour récuperer tout les users
    static async getAll (req: Request, res: Response) {
        // Essaie de...
        try {
            const result = await userModel.getAllUsers() as IUser[]; // Tableau IUser => 
                // récupère plusieurs users (tableau d'objets result qui respecte la structure IUser)
            return res.status(200).json({message: "Action getAllUsers reussi", result});
        }
        // Sinon...
        catch (error) {
            return res.status(500).json({message: "Erreur de getAllUsers", error});
        }
    }

    // Méthode qui fait appel a UserModel pour récuprer un utilisateur via un email
// =========================
// Problème de double route avec Create, puis-je utiliser plusieurs routes du même types sur la même url ???
// Solution ===> Pas de solus ===> méthode email déplacer dans les méthodes qui en ont besoin
// =========================
    // static async getByEmail (req: Request, res: Response) {
    //     try {
    //         if(!req.body){
    //             return res.status(400).json({message: "Saisis manquantes"});
    //         }
            
    //         const doesEmailExist = await userModel.getUserByEmail(req.body.email);

    //         if(doesEmailExist && Object.keys(doesEmailExist).length !== 0){
    //             console.log('l\'email est déja utilisé', doesEmailExist);
    //             return res.status(200).json({message: "Action getByEmail reussi", doesEmailExist})
    //         } else {
    //             console.log('l\'email n\'est pas déja utilisé', doesEmailExist);
    //             return res.status(500).json({message: "Action getByEmail fail"})
    //         }
    //     }
    //     catch (error) {
    //         return res.status(500).json({message: "Erreur de getByEmail", error});
    //     }
    // }

    // Méthode qui fait appel a UserModel pour crée un nouvel utilisateur
    static async create (req: Request, res: Response) {
        try {
            if(!req.body){
                return res.status(400).json({message: "Action create non compléter"});
            }

            const doesEmailExist = await userModel.getUserByEmail(req.body.email);
            if(doesEmailExist && Object.keys(doesEmailExist).length !== 0){
                return res.status(400).json({message: 'l\'email est déja utilisé', doesEmailExist})
            } else {
                const hashedPassword = await argon2.hash(req.body.password);
                const user = {
                    ...req.body, password: hashedPassword,
                } as IUser;

                const result = await userModel.createUser(user);
                return res.status(201).json({message: "Action create reussi"})
            }
        }
        catch (error) {
            return res.status(500).json({message: "Action create fail", error});
        }
    }
}