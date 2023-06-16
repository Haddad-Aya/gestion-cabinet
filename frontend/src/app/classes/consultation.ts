import { Paye } from "./enums/Paye"
import { RendezVous } from "./RendezVous"
import { Fichier } from "./Fichiers"
import { Traitement } from "./Traitement"
import { TypeConsultation } from "./enums/TypeConsultation"

export class consultation{
    evolution!:string
    dateConsultation!:Date
    heureConsultation!:string
    paiment!:Paye
    prix!:Float32Array
    typeConsultation!:TypeConsultation
    rendezVous!:RendezVous
    fichiers!:Fichier[]
    traitements!:Traitement[]
}