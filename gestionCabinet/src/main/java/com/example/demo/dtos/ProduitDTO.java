package com.example.demo.dtos;

import lombok.Data;

@Data
public class ProduitDTO {
    private Long id;
    private String nom;
    private int quantite;
    private Float prixUnitaire;
}
