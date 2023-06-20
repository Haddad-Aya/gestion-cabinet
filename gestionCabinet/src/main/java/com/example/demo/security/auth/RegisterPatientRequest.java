package com.example.demo.security.auth;

import java.util.Date;

import com.example.demo.enums.Civilite;
import com.example.demo.enums.Role;
import com.example.demo.enums.Sexe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterPatientRequest {
	private String nom;
    private String prenom;
    private String email;
    private Integer telephone;
    private String adr;
    private Integer codePostal;
    private Sexe sexe;
    private Date dateNaissance;
    private Long idCnam;
    private Civilite civilite;
    private String motDePasse;
    private Role role;
    private boolean archive;
}
