package com.sandeep.stjosephchurch;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;

public class ValidLoginCheck {
	
	public static WebDriver driver;
	
  @Test
  public void validLogin() {
	  driver.findElement(By.name("user")).sendKeys("admin");
	  driver.findElement(By.name("pass")).sendKeys("billing890");
	  driver.findElement(By.name("login")).click();
  }
  
  @BeforeMethod
  public void beforeMethod() {
  }

  @AfterMethod
  public void afterMethod() {
	  driver.findElement(By.linkText("Product List")).click();
  }

  @BeforeClass
  public void beforeClass() {
	  System.setProperty("webdriver.chrome.driver","D:\\Selenium\\chromedriver.exe");
	  driver = new ChromeDriver();
	  driver.get("http://stgeorgechurchperumbavoor.com/billing/");
	  driver.manage().window().maximize();  
  }

  @AfterClass
  public void afterClass() {
	  driver.close();
  }

}
