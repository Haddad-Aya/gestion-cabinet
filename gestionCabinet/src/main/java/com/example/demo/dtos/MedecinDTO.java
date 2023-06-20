package com.example.demo.dtos;

import lombok.Data;


@Data
public class MedecinDTO extends UtilisateurDTO{
    private long id;
    private String nom;
    private String prenom;
    private String email;
    private Integer telephone;
    private String adr;
    private Integer codePostal;
    private Integer nCin;
    private String nomCabinet;
}
