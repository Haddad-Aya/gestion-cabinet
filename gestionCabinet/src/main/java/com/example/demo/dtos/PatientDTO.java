package com.example.demo.dtos;

import lombok.Data;

import java.util.Date;

import com.example.demo.enums.Civilite;
import com.example.demo.enums.Sexe;

@Data
public class PatientDTO extends UtilisateurDTO{
    private long id;
    private String nom;
    private String prenom;
    private String email;
    private Integer telephone;
    private String adr;
    private Integer codePostal;
    private Sexe sexe;
    private Date dateNaissance;
    private Civilite civilite;
    private Long idCnam;
    private boolean archive;
}
