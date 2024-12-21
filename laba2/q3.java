package laba2;

import java.util.Scanner;

public class q3 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        double tempCels = scanner.nextDouble();
        System.out.print(tempCels+" градусов по Цельсию равно ");

        double tempFahr = tempCels*9/5 +32;
        System.out.print(tempFahr+" градусов по Фаренгейту");
    }
}