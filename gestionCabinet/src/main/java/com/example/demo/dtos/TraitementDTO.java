package com.example.demo.dtos;

import lombok.Data;

@Data
public class TraitementDTO {
    private Long id;
    private String nom;
    private int quantite;
    private String effet;
    private String nbrFoisParJour;
}
