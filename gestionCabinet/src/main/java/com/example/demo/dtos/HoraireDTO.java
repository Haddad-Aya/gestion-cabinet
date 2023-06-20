package com.example.demo.dtos;

import lombok.Data;


@Data
public class HoraireDTO {
	private long id;
	private String jour;
    private String dateDebutPremS;
    private String dateFinPremS;
    private String dateDebutDeuS;
    private String dateFinDeuS;
    private MedecinDTO medecinDTO;
}
