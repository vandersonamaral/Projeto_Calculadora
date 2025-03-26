package com.program.calculadora.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculadora")
@CrossOrigin(origins = "*")
public class CalculadoraController {

    @GetMapping("/calcular")
    public String calcular(@RequestParam double num1, @RequestParam double num2, @RequestParam String operador) {
        double resultado;

        switch (operador) {
            case "+":
                resultado = num1 + num2;
                break;
            case "-":
                resultado = num1 - num2;
                break;
            case "*":
                resultado = num1 * num2;
                break;
            case "/":
                if (num2 == 0) throw new IllegalArgumentException("Divisão por zero não permitida.");
                resultado = num1 / num2;
                break;
            default:
                throw new IllegalArgumentException("Operador inválido. Use: +, -, * ou /");
        }

       // formatando o resultado caso for inteiro retorna sem o decimal
        //Senão, retorna com ponto flutuante formatado
        return (resultado % 1 == 0) ? String.valueOf((int) resultado) : String.valueOf(resultado);
    }
}
