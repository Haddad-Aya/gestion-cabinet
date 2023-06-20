package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.UtilisateurDTO;
import com.example.demo.entities.Utilisateur;

@Service
public class UtilisateurMapperImpl {
    public UtilisateurDTO fromUtilisateur(Utilisateur utilisateur){
    	UtilisateurDTO utilisateurDTO=new UtilisateurDTO();
        BeanUtils.copyProperties(utilisateur,utilisateurDTO);
        return utilisateurDTO;

    }

    public Utilisateur fromUtilisateurDTO(UtilisateurDTO utilisateurDTO){
    	Utilisateur utilisateur=new Utilisateur();
        BeanUtils.copyProperties(utilisateurDTO,utilisateur);
        return utilisateur;

    }
}
