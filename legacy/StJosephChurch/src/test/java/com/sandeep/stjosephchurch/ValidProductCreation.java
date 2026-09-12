package com.sandeep.stjosephchurch;


import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;
import org.testng.Assert;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class ValidProductCreation {
	
	public static WebDriver driver;
	public static File file;
	public static FileInputStream file_input;
	public static Properties prop;
	public static Workbook wb;
	public static Sheet sh;
	
	
  @Test (priority=0)
  public void loginData() {
	  driver.findElement(By.name("user")).sendKeys(prop.getProperty("username"));
	  driver.findElement(By.name("pass")).sendKeys(prop.getProperty("password"));
	  driver.findElement(By.name("login")).click();
  }
  
  @Test (priority=1)
  public void createProduct() {
	  
	  driver.findElement(By.linkText("New Product")).click();
	  
	  int row_length = sh.getRows();
	  for (int r = 1; r < row_length; r++) {
		  System.out.println("Row Length = " + row_length);
		  String item = sh.getCell(0, r).getContents();
		  String code = sh.getCell(1, r).getContents();
		  String price = sh.getCell(2, r).getContents();
		  String qty = sh.getCell(3, r).getContents();
		  driver.findElement(By.name("product")).sendKeys(item);
		  driver.findElement(By.name("code")).sendKeys(code);
		  driver.findElement(By.name("price")).sendKeys(price);
		  driver.findElement(By.name("qty")).sendKeys(qty);
		  driver.findElement(By.xpath("//*[@id=\'user_create\']/tbody/tr[5]/td[2]/input")).click();
		  String expected = "* New Product added successfully";
		  String actual = driver.findElement(By.xpath("//td[contains(text(),'* New Product added successfully')]")).getText();
		  System.out.println(actual);
		  Assert.assertEquals(actual, expected);
		  driver.findElement(By.name("product")).clear();
		  driver.findElement(By.name("code")).clear();
		  driver.findElement(By.name("price")).clear();
		  driver.findElement(By.name("qty")).clear();
	  }
  }
  
  
  @BeforeClass
  public void beforeClass() throws IOException {
	  file = new File ("C:\\Users\\Sandeep\\sandeep-workspace\\StJosephChurch\\src\\test\\java\\com\\sandeep\\properties\\LoginInfo.properties");
	  file_input = new FileInputStream(file);
	  prop = new Properties();
	  prop.load(file_input);
	  
	  System.setProperty("webdriver.chrome.driver","D:\\Selenium\\chromedriver.exe");
	  driver = new ChromeDriver();
	  driver.get(prop.getProperty("url"));
	  driver.manage().window().maximize();
  }
  
  @BeforeTest
  public void beforeTest() throws BiffException, IOException {
	  wb = Workbook.getWorkbook(new File("D:\\Selenium_Project\\ProductCreation.xls"));
	  sh = wb.getSheet(0);
  }

  @AfterClass
  public void afterClass() {
	  driver.close();
  }

}
