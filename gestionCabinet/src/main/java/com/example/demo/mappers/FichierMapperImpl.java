package com.example.demo.mappers;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.FichierDTO;
import com.example.demo.entities.Fichier;

@Service
public class FichierMapperImpl {
    public FichierDTO fromFichier(Fichier fichier){
        FichierDTO fichierDTO=new FichierDTO();
        BeanUtils.copyProperties(fichier,fichierDTO);
        return fichierDTO;

    }

    public Fichier fromFichierDTO(FichierDTO fichierDTO){
        Fichier fichier=new Fichier();
        BeanUtils.copyProperties(fichierDTO,fichier);
        return fichier;

    }
    public List<FichierDTO> fromFichiers(Collection<Fichier> collection) {
		List<FichierDTO> collect=collection.stream()
				.map(t ->this.fromFichier(t))
				.collect(Collectors.toList());
		return collect;
	}
}
