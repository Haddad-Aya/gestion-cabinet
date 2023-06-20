package com.example.demo.security.auth;

import com.example.demo.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterMedecinRequest {
	private String nom;
    private String prenom;
    private String email;
    private Integer telephone;
    private String adr;
    private Integer codePostal;
    private Integer nCin;
    private String nomCabinet;
    private String motDePasse;
    private Role role;
}
