import io.appium.java_client.MobileElement;
import io.appium.java_client.android.connection.ConnectionStateBuilder;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ErrorsNotificationsIsDisplayedTest extends BaseMethods {


    @Test
    public void testErrorsNotificationsIsDisplayed() {
        StartPage startPage = new StartPage(driver);
        startPage.urlInput.clear();
        startPage.numberInput.clear();
        startPage.timeInput.clear();
        startPage.saveButton.click();

        Assert.assertTrue(startPage.errorURL.isDisplayed());
        Assert.assertTrue(startPage.errorNumber.isDisplayed());
        Assert.assertTrue(startPage.errorInterval.isDisplayed());

        Assert.assertEquals(startPage.errorURL.getText(), "Value can't be blank or value is incorrect");
        Assert.assertEquals(startPage.errorNumber.getText(), "Value can't be blank or value is incorrect");
        Assert.assertEquals(startPage.errorInterval.getText(), "Value can't be blank or value is incorrect");
    }

}
