# Reading Settings Component

Компонент `ReadingSettingsPopover` предоставляет пользователям возможность настройки параметров чтения статей.

## Функциональность

### Настройки
1. **Размер шрифта** - слайдер от 12px до 24px
2. **Высота строки** - слайдер от 1.2 до 2.0  
3. **Выбор шрифта** - радио-группа:
   - Noto Sans (по умолчанию)
   - Noto Serif
4. **Выравнивание текста** - переключатель между левым и центральным выравниванием
5. **Отображение изображений** - переключатель показа/скрытия изображений

### Особенности
- **Двойная система состояний**: 
  - `tempSettings` - для предварительного просмотра изменений
  - `settings` - для сохраненных и применяемых настроек
- Настройки сохраняются в localStorage только после нажатия "Save"
- Автоматическое применение настроек при загрузке страницы
- Предварительный просмотр в popover показывает изменения до сохранения
- Для блоков кода всегда используется шрифт Fira Code
- Кнопки управления:
  - **Save** - сохраняет временные настройки и применяет их
  - **Cancel** - отменяет изменения и закрывает popover
  - **Reset to Default** - сбрасывает временные настройки к значениям по умолчанию

## Использование

```tsx
import { ReadingSettingsPopover } from "@/components/articles/reading-settings-popover";

// В компоненте
<ReadingSettingsPopover />
```

## CSS переменные

Компонент использует следующие CSS переменные:
- `--article-font-size` - размер шрифта
- `--article-line-height` - высота строки
- `--article-font-family` - семейство шрифтов
- `--article-text-align` - выравнивание текста

## Структура данных настроек

```typescript
interface ReadingSettings {
  fontSize: number;           // 12-24
  lineHeight: number;         // 1.2-2.0
  fontFamily: "noto-sans" | "noto-serif";
  textAlign: "left" | "center";
  showImages: boolean;
}
```

## Реализация Save/Cancel функциональности

### Состояние компонента
Компонент использует два отдельных состояния:

```typescript
const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);      // Сохраненные настройки
const [tempSettings, setTempSettings] = useState<ReadingSettings>(defaultSettings); // Временные настройки для preview
```

### Функции управления
- `updateTempSetting()` - обновляет временные настройки для preview
- `saveSettings()` - сохраняет временные настройки в localStorage и применяет их к DOM
- `cancelChanges()` - отменяет изменения и возвращает к сохраненным настройкам
- `resetSettings()` - сбрасывает временные настройки к значениям по умолчанию
- `handleOpenChange()` - сбрасывает временные настройки при открытии popover

### Применение настроек
- Preview в popover использует `tempSettings`
- DOM использует сохраненные `settings` через `applySettingsToDOM()`
- Настройки применяются только после нажатия кнопки "Save"

### Статус: ✅ Завершено
Все запрошенные функции реализованы и протестированы:
- ✅ Кнопка Reading Settings рядом с кнопкой Original
- ✅ Popover с настройками (размер шрифта, высота строки, шрифт, выравнивание, изображения)
- ✅ Preview с временными настройками
- ✅ Кнопки Save/Cancel для управления применением настроек
- ✅ Сохранение в localStorage
- ✅ Автоматическое применение при загрузке страницы
