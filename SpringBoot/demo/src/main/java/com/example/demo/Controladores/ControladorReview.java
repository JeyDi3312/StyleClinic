package com.example.demo.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.Reviews;
import com.example.demo.Servicios.ServicioReview;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/reviews")
public class ControladorReview {
    @Autowired
    ServicioReview servicioReview;

    @GetMapping()
    public ArrayList<Reviews> obtenerReview() {
        return servicioReview.obtenerReview();
    }
    
    @PostMapping()
    public Reviews guardarReviews(@RequestBody Reviews reviews) {
        //TODO: process POST request
        
        return this.servicioReview.guardarReviews(reviews);
    }
    @GetMapping(path = "/idreview/{idreview}")
    public Optional <Reviews> obtenerporid(@PathVariable("idreview") String idreview) {
        return this.servicioReview.obtenerporid(idreview);
    }
    @GetMapping("/fecha")
    public ArrayList <Reviews> obtenerporfecha(@RequestParam ("fecha")String fecha) {
        return this.servicioReview.obtenerporfecha(fecha);
    }

    @DeleteMapping(path = "/idreview/{idreview}")
    public String borrarAdmin(@PathVariable ("idreview") String idreview){
        String Resultado = this.servicioReview.eliminarReview(idreview);
        return Resultado;
    }
    
    
}
