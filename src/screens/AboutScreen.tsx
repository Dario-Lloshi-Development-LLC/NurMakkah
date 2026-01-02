import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DataService from '../services/DataService';

import { useNavigationContext } from '../shared/navigation/AppNavigator';
import ContentService from '../features/content/services/ContentService';
import { APP_CONFIG } from '../core/constants';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AboutScreen: React.FC = () => {
  const { settings } = useNavigationContext();
  const isRTL = shouldUseRTL(settings);
  const [hajjData, setHajjData] = React.useState<any>(null);

  React.useEffect(() => {
    const loadHajjData = async () => {
      const data = await ContentService.getHajjData();
      setHajjData(data);
    };
    loadHajjData();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
      <View style={[styles.header, { backgroundColor: APP_CONFIG.theme.primary }]}>
        <Text style={styles.headerTitle}>
          {getLocalizedTextWithFallback({ albanian: 'Rreth Aplikacionit', arabic: 'حول التطبيق', english: 'About App' }, settings)}
        </Text>
        <Text style={styles.headerDescription}>
          {getLocalizedTextWithFallback({
            albanian: 'Udhëzues i plotë për rregullat e Haxhit',
            arabic: 'دليل كامل لأحكام الحج',
            english: 'Complete guide for Hajj rules'
          }, settings)}
        </Text>
      </View>

      {hajjData && (
        <>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: APP_CONFIG.theme.primary, textAlign: isRTL ? 'right' : 'left' }]}>
              {getLocalizedTextWithFallback({ albanian: 'Hyrje', arabic: 'مقدمة', english: 'Introduction' }, settings)}
            </Text>
            <Text style={[styles.sectionText, { textAlign: isRTL ? 'right' : 'left' }]}>
              {getLocalizedTextWithFallback(hajjData.introduction.description, settings)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: APP_CONFIG.theme.primary, textAlign: isRTL ? 'right' : 'left' }]}>
              {getLocalizedTextWithFallback({ albanian: 'Detyrimi i Haxhit', arabic: 'وجوب الحج', english: 'Hajj Obligation' }, settings)}
            </Text>
            <Text style={[styles.sectionText, { textAlign: isRTL ? 'right' : 'left' }]}>
              {getLocalizedTextWithFallback(hajjData.detyrimi_i_haxhit.description, settings)}
            </Text>

            <View style={[styles.hadithContainer, { backgroundColor: `${APP_CONFIG.theme.primary}10` }]}>
              <Text style={[styles.hadithTitle, { color: APP_CONFIG.theme.primary, textAlign: isRTL ? 'right' : 'left' }]}>
                {getLocalizedTextWithFallback({ albanian: 'Hadithi:', arabic: 'الحديث:', english: 'Hadith:' }, settings)}
              </Text>
              <Text style={[styles.hadithText, { textAlign: isRTL ? 'right' : 'left' }]}>
                "{getLocalizedTextWithFallback(hajjData.detyrimi_i_haxhit.hadith, settings)}"
              </Text>
            </View>
          </View>
        </>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: APP_CONFIG.theme.primary, textAlign: isRTL ? 'right' : 'left' }]}>
          {getLocalizedTextWithFallback({ albanian: 'Aplikacioni', arabic: 'التطبيق', english: 'The Application' }, settings)}
        </Text>
        <Text style={[styles.sectionText, { textAlign: isRTL ? 'right' : 'left' }]}>
          {getLocalizedTextWithFallback({
            albanian: 'Ky aplikacion është krijuar për të ndihmuar muslimanët në mësimin e rregullave të Haxhit dhe Umres.',
            arabic: 'تم إنشاء هذا التطبيق لمساعدة المسلمين في تعلم أحكام الحج والعمرة.',
            english: 'This application was created to help Muslims learn the rules of Hajj and Umrah.'
          }, settings)}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Nur Makkah v1.0</Text>
        <Text style={styles.footerText}>© 2026 - Për më shumë informata kontaktoni zhvilluesit</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  section: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 0,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: APP_CONFIG.theme.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  hadithContainer: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  hadithTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  hadithText: {
    fontSize: 14,
    color: APP_CONFIG.theme.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: APP_CONFIG.theme.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default AboutScreen;