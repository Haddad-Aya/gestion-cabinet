package com.example.demo.mappers;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.TraitementDTO;
import com.example.demo.entities.Traitement;

@Service
public class TraitementMapperImpl {
    public TraitementDTO fromTraitement(Traitement traitement){
        TraitementDTO traitementDTO=new TraitementDTO();
        BeanUtils.copyProperties(traitement,traitementDTO);
        return traitementDTO;

    }

    public Traitement fromTraitement(TraitementDTO traitementDTO){
        Traitement traitement=new Traitement();
        BeanUtils.copyProperties(traitementDTO,traitement);
        return traitement;

    }
	public List<TraitementDTO> fromTraitements(Collection<Traitement> collection) {
		List<TraitementDTO> collect=collection.stream()
				.map(c ->this.fromTraitement(c))
				.collect(Collectors.toList());
		return collect;
	}
}
