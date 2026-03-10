import type { Request, Response } from "express";
import userModel from "../model/userModel.ts";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export default class authController {
    static async login (req: Request, res: Response) {
        // Est ce que la requète est conforme ? DONE
            // Oui => DONE
                // Est-ce que l'émail est déja prise ? DONE
                // Oui => DONE
                    // Récupération des informations de l'utilisateurs via l'émail et comparaison mdp bdd / mdp entrant DONE
                    // Est-ce que les 2 mdp sont identiques ? DONE
                    // Oui => DONE
                        // Création du token JWT DONE
                        // Envoie en cookie DONE
                    // Non => Erreur
                // Non => Erreur DONE
            // Non => Erreur DONE


            // Une partie n'a pas été très bien compris je dois aller plus profond dans les termes
        try {
            if(!req.body){
                return res.status(400).json({message: "Formulaire login non compléter"});
            }

            const rows = await userModel.getUserByEmail(req.body.email);
            if(rows.length > 0){
                const user = rows[0];

                if(!user){
                    return res.status(400).json({message: "Utilisateur invalide"});
                }

                const passwordUnHashed = await argon2.verify(user.password, req.body.password);
                
                if(!passwordUnHashed){
                    return res.status(400).json({message: "Le mot de passe n'est pas correspondant"});
                }

                const secretKey = process.env.SECRET_KEY;
                if(!secretKey){
                    return res.status(500).json({message: "La variable d'environnement SECRET_KEY n'est pas trouver"})
                }
                
                const token = jwt.sign({
                    user_id: user.id, 
                    user_email: user.email, 
                    role: "user"
                }, secretKey, {expiresIn: "24h"})

                res.cookie("Token", token);
                return res.status(200).json({message: "Reussite de la connexion"});
            } else {
                return res.status(400).json({message: "L'émail n'existe pas en base de données"});
            }
        } catch (error) {
            return res.status(500).json({message: "Erreur de login", error});
        }
    }

    static async profil () {

    }
}