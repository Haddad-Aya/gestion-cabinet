package com.example.demo.dtos;

import lombok.Data;

import java.util.Date;
import java.util.List;



@Data
public class FactureDTO {
    private Long id;
    private String titre;
    private Float prix;
    private Date dateFacture;
    private List<FichierDTO> fichierDTO;
    private MedecinDTO medecinDTO;
}
