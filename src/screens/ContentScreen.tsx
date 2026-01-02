import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigationContext } from '../shared/navigation/AppNavigator';
import ContentService from '../features/content/services/ContentService';
import { Rule, Category } from '../core/types';
import { APP_CONFIG } from '../core/constants';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';

interface RouteParams {
    category: string;
    title: any;
}

const ContentScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { category: categoryName, title } = route.params as RouteParams;
    const { settings } = useNavigationContext();
    const isRTL = shouldUseRTL(settings);

    const [rules, setRules] = useState<Rule[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const loadRules = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await ContentService.initialize(settings);
            const data = await ContentService.getRulesByCategory(categoryName);
            setRules(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load rules');
        } finally {
            setLoading(false);
        }
    }, [categoryName, settings]);

    useEffect(() => {
        loadRules();
    }, [loadRules]);

    const filteredRules = useMemo(() => {
        if (!searchQuery.trim()) return rules;
        const query = searchQuery.toLowerCase().trim();
        return rules.filter(rule => {
            const titleText = getLocalizedTextWithFallback(rule.title, settings).toLowerCase();
            const descText = getLocalizedTextWithFallback(rule.description, settings).toLowerCase();
            return titleText.includes(query) || descText.includes(query);
        });
    }, [rules, searchQuery, settings]);

    const renderRule = ({ item }: { item: Rule }) => {
        const titleText = getLocalizedTextWithFallback(item.title, settings);
        const descriptionText = getLocalizedTextWithFallback(item.description, settings);

        return (
            <View style={[styles.ruleCard, { borderLeftColor: APP_CONFIG.theme.primary }]}>
                <Text style={[styles.ruleTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{titleText}</Text>
                <Text style={[styles.ruleDescription, { textAlign: isRTL ? 'right' : 'left' }]}>{descriptionText}</Text>

                {item.evidence && (
                    <View style={[styles.evidenceContainer, { borderTopColor: '#eee', alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
                        {item.evidence.quranic && item.evidence.quranic.length > 0 && (
                            <View style={styles.evidenceItem}>
                                <Text style={[styles.evidenceLabel, { textAlign: isRTL ? 'right' : 'left' }]}>
                                    {getLocalizedTextWithFallback({ albanian: 'Kur\'ani:', arabic: 'القرآن:', english: 'Quran:' }, settings)}
                                </Text>
                                <Text style={[styles.evidenceText, styles.quranicText]}>{item.evidence.quranic[0]}</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={APP_CONFIG.theme.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Icon name="error" size={48} color={APP_CONFIG.theme.primary} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadRules}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color={APP_CONFIG.theme.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
                        placeholder={getLocalizedTextWithFallback({ albanian: 'Kërko...', arabic: 'بحث...', english: 'Search...' }, settings)}
                        placeholderTextColor={APP_CONFIG.theme.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredRules}
                renderItem={renderRule}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {getLocalizedTextWithFallback(
                                { albanian: 'Nuk u gjet asgjë', arabic: 'لم يتم العثور على شيء', english: 'Nothing found' },
                                settings
                            )}
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: 'transparent',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: APP_CONFIG.theme.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: APP_CONFIG.theme.text,
        paddingVertical: 12,
        fontSize: 16,
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
    ruleCard: {
        backgroundColor: APP_CONFIG.theme.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    ruleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: APP_CONFIG.theme.primary,
        marginBottom: 8,
    },
    ruleDescription: {
        fontSize: 15,
        color: APP_CONFIG.theme.text,
        lineHeight: 22,
    },
    evidenceContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    evidenceItem: {
        marginBottom: 8,
    },
    evidenceLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: APP_CONFIG.theme.textSecondary,
        marginBottom: 4,
    },
    evidenceText: {
        fontSize: 14,
        color: APP_CONFIG.theme.text,
        lineHeight: 20,
    },
    quranicText: {
        fontFamily: 'serif',
        fontSize: 16,
        color: APP_CONFIG.theme.primary,
        marginTop: 4,
    },
    errorText: {
        fontSize: 16,
        color: APP_CONFIG.theme.text,
        marginTop: 16,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: APP_CONFIG.theme.primary,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: APP_CONFIG.theme.textSecondary,
        fontStyle: 'italic',
    },
});

export default ContentScreen;
