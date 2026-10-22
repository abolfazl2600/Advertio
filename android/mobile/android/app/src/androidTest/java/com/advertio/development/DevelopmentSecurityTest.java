package com.advertio.development;

import static org.junit.Assert.*;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.security.NetworkSecurityPolicy;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class DevelopmentSecurityTest {
    @Test
    public void developmentManifestEnforcesNetworkAndBackupPolicy() {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertEquals("com.advertio.development", context.getPackageName());
        assertTrue(context.getApplicationInfo().targetSdkVersion >= 36);
        assertEquals(0, context.getApplicationInfo().flags & ApplicationInfo.FLAG_ALLOW_BACKUP);
        assertFalse(NetworkSecurityPolicy.getInstance().isCleartextTrafficPermitted());
    }
}
