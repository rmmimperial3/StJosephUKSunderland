package com.sandeep.stjosephchurch;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;

public class HyperLinksCheck {
	
	public static WebDriver driver;
	public static File file;
	public static FileInputStream file_input;
	public static Properties prop;
	
  @Test (priority=0)
  public void loginData() {
	  driver.findElement(By.name("user")).sendKeys(prop.getProperty("username"));
	  driver.findElement(By.name("pass")).sendKeys(prop.getProperty("password"));
	  driver.findElement(By.name("login")).click();
  }
	
  @Test (priority=1)
  public void productList() {
	  driver.findElement(By.linkText("Product List")).click();
  }
  
  @Test (priority=2)
  public void newProduct() {
	  driver.findElement(By.linkText("New Product")).click();
  }
  
  @Test (priority=3)
  public void billing() {
	  driver.findElement(By.linkText("Billing")).click();
  }
  
  @Test (priority=4)
  public void billList() {
	  driver.findElement(By.linkText("Bill List")).click();
  }
  
  @BeforeMethod
  public void beforeMethod() {
  }

  @AfterMethod
  public void afterMethod() {
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

  @AfterClass
  public void afterClass() {
	  driver.close();
  }

}
