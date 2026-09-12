package com.sandeep.stjosephchurch;

import org.testng.annotations.Test;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;

public class InvalidLoginCheck {
	
	public static WebDriver driver;
	public static Workbook wb;
	public static Sheet sh;
	
  @Test
  public void invalidLogin() {
	  
	  int row_length = sh.getRows();
	  for (int r = 1; r < row_length; r++) {
		  String username = sh.getCell(0, r).getContents();
		  String password = sh.getCell(1, r).getContents();
		  driver.findElement(By.name("user")).sendKeys(username);
		  driver.findElement(By.name("pass")).sendKeys(password);
		  driver.findElement(By.name("login")).click();
		  driver.navigate().refresh();
	  }
	    
  }
  
  @BeforeMethod
  public void beforeMethod() {
  }

  @AfterMethod
  public void afterMethod() {
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
  
  @BeforeTest
  public void beforeTest() throws BiffException, IOException {
	  wb = Workbook.getWorkbook(new File("D:\\Selenium_Project\\SampleExcel.xls"));
	  sh = wb.getSheet(0);
  }

  @AfterTest
  public void afterTest() {
  }

}
