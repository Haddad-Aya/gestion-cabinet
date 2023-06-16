import { Time } from "@angular/common"
import { StatusRDV } from "./enums/StatusRDV"
import { patient } from "./patient"

export class RendezVous{
    dateRendezVous!:Date
    heureDebut!:Time
    heureFin!:Time
    status!:StatusRDV
    patient!:patient
}