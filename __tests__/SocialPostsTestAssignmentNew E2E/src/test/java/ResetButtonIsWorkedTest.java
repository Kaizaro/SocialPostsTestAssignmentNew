import io.appium.java_client.MobileElement;
import io.appium.java_client.android.connection.ConnectionStateBuilder;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ResetButtonIsWorkedTest extends BaseMethods {


    @Test
    public void testResetButtonIsWorked() {
        StartPage startPage = new StartPage(driver);

        String url = startPage.urlInput.getText();
        startPage.urlInput.clear();
        String urlClear = startPage.urlInput.getText();
        Assert.assertEquals(urlClear, null);
        String number = startPage.numberInput.getText();
        startPage.numberInput.clear();
        String numberClear = startPage.numberInput.getText();
        Assert.assertEquals(numberClear, null);
        String interval = startPage.timeInput.getText();
        startPage.timeInput.clear();
        String intervalClear = startPage.timeInput.getText();
        Assert.assertEquals(intervalClear, null);
        startPage.resetButton.click();

        Assert.assertEquals(url, "https://run.mocky.io/v3/27a44f7d-67ca-4e96-b901-a159d315b922");
        Assert.assertEquals(number, "10");
        Assert.assertEquals(interval, "01:00");
    }

}
