package laba2;

import java.util.Scanner;

public class q4 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.print("Какой начальный вклад?");
        double money = scanner.nextDouble();
        System.out.print("А на сколько лет?");
        int years = scanner.nextInt();
        System.out.print("Понятно... Какая процентная ставка?");
        double percentage = scanner.nextDouble();

        percentage=percentage/100;

        for(int i=1; i<=years; i++){
            System.out.println(i+1);
            money=money+(money*percentage);
        }
        System.out.printf("Через %d года ты получишь %.2f рублев", years, money);
    }

}
