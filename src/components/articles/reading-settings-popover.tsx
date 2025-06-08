"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: "noto-sans" | "noto-serif";
  textAlign: "left" | "justify";
  showImages: boolean;
}

const defaultSettings: ReadingSettings = {
  fontSize: 16,
  lineHeight: 1.6,
  fontFamily: "noto-serif",
  textAlign: "left",
  showImages: true,
};

export function ReadingSettingsPopover() {
  const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadAndApplySettings = () => {
      // Debug: Check if CSS font variables are available
      const root = document.documentElement;
      const notoSansVar = getComputedStyle(root)
        .getPropertyValue("--font-noto-sans")
        .trim();
      const notoSerifVar = getComputedStyle(root)
        .getPropertyValue("--font-noto-serif")
        .trim();
      const firaCodeVar = getComputedStyle(root)
        .getPropertyValue("--font-fira-code")
        .trim();

      console.log("=== CHECKING CSS FONT VARIABLES ===");
      console.log("--font-noto-sans:", notoSansVar || "NOT FOUND");
      console.log("--font-noto-serif:", notoSerifVar || "NOT FOUND");
      console.log("--font-fira-code:", firaCodeVar || "NOT FOUND");

      const savedSettings = localStorage.getItem("reading-settings");
      let settingsToApply = defaultSettings;

      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          settingsToApply = { ...defaultSettings, ...parsed };
          console.log("Loaded settings from localStorage:", settingsToApply);
        } catch (error) {
          console.error("Failed to parse reading settings:", error);
        }
      } else {
        console.log("No saved settings found, using defaults:", settingsToApply);
      }

      setSettings(settingsToApply);

      // Apply settings immediately
      applySettingsToDOM(settingsToApply);
    };

    // If DOM is already loaded, apply immediately
    if (document.readyState === "complete") {
      loadAndApplySettings();
    } else {
      // Wait for DOM to be ready
      const timer = setTimeout(loadAndApplySettings, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Apply settings to DOM when settings change
  useEffect(() => {
    applySettingsToDOM(settings);
  }, [settings]);

  const applySettingsToDOM = (settings: ReadingSettings) => {
    const root = document.documentElement;

    // Debug logging
    console.log("=== APPLYING READING SETTINGS ===");
    console.log("Settings:", settings);
    console.log(
      "Available article content elements:",
      document.querySelectorAll(".article-content").length
    );

    // Check CSS font variables availability
    const geistVar = getComputedStyle(root).getPropertyValue("--font-geist").trim();
    const notoSansVar = getComputedStyle(root)
      .getPropertyValue("--font-noto-sans")
      .trim();
    const notoSerifVar = getComputedStyle(root)
      .getPropertyValue("--font-noto-serif")
      .trim();
    const firaCodeVar = getComputedStyle(root)
      .getPropertyValue("--font-fira-code")
      .trim();

    console.log("=== FONT VARIABLES AVAILABILITY ===");
    console.log("--font-geist:", geistVar || "NOT AVAILABLE");
    console.log("--font-noto-sans:", notoSansVar || "NOT AVAILABLE");
    console.log("--font-noto-serif:", notoSerifVar || "NOT AVAILABLE");
    console.log("--font-fira-code:", firaCodeVar || "NOT AVAILABLE");

    // Apply font size
    root.style.setProperty("--article-font-size", `${settings.fontSize}px`);
    console.log("Set font size to:", `${settings.fontSize}px`);

    // Apply line height
    root.style.setProperty("--article-line-height", settings.lineHeight.toString());
    console.log("Set line height to:", settings.lineHeight.toString());

    // Apply font family with detailed logging
    let fontFamilyValue;
    if (settings.fontFamily === "noto-serif") {
      if (notoSerifVar) {
        fontFamilyValue = "var(--font-noto-serif), serif";
      } else {
        fontFamilyValue = '"Noto Serif", serif';
        console.warn("Noto Serif CSS variable not available, using fallback");
      }
      console.log("Applied Noto Serif font family:", fontFamilyValue);
    } else {
      if (notoSansVar) {
        fontFamilyValue = "var(--font-noto-sans), sans-serif";
      } else {
        fontFamilyValue = '"Noto Sans", sans-serif';
        console.warn("Noto Sans CSS variable not available, using fallback");
      }
      console.log("Applied Noto Sans font family:", fontFamilyValue);
    }

    root.style.setProperty("--article-font-family", fontFamilyValue);

    // Apply text alignment
    root.style.setProperty("--article-text-align", settings.textAlign);
    console.log("Set text alignment to:", settings.textAlign);

    // Show/hide images (only if article content exists)
    const articleContent = document.querySelector(".article-content");
    if (articleContent) {
      const images = articleContent.querySelectorAll("img");
      images.forEach((img) => {
        (img as HTMLElement).style.display = settings.showImages ? "block" : "none";
      });

      // Force reflow to ensure styles are applied
      articleContent.classList.add("reading-settings-applied");
      console.log("Added reading-settings-applied class to article content");

      // Check if styles are actually applied
      const articleStyles = getComputedStyle(articleContent);
      console.log("=== ARTICLE CONTENT COMPUTED STYLES ===");
      console.log("font-family:", articleStyles.fontFamily);
      console.log("font-size:", articleStyles.fontSize);
      console.log("line-height:", articleStyles.lineHeight);
    } else {
      console.log("No article content found, settings applied to root only");
    }

    // Log final computed styles for debugging
    setTimeout(() => {
      const computedFontFamily = getComputedStyle(root)
        .getPropertyValue("--article-font-family")
        .trim();
      const computedFontSize = getComputedStyle(root)
        .getPropertyValue("--article-font-size")
        .trim();
      const computedLineHeight = getComputedStyle(root)
        .getPropertyValue("--article-line-height")
        .trim();

      console.log("=== FINAL COMPUTED CSS VARIABLES ===");
      console.log("--article-font-family:", computedFontFamily);
      console.log("--article-font-size:", computedFontSize);
      console.log("--article-line-height:", computedLineHeight);

      if (articleContent) {
        const actualStyle = getComputedStyle(articleContent);
        console.log("=== ACTUAL APPLIED STYLES ===");
        console.log("Computed font-family:", actualStyle.fontFamily);
        console.log("Computed font-size:", actualStyle.fontSize);
        console.log("Computed line-height:", actualStyle.lineHeight);
      }
    }, 100);
  };

  const updateSetting = <K extends keyof ReadingSettings>(
    key: K,
    value: ReadingSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("reading-settings", JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("reading-settings", JSON.stringify(defaultSettings));
  };

  const clearAllSettings = () => {
    localStorage.removeItem("reading-settings");
    setSettings(defaultSettings);
    console.log("Cleared all settings, reset to defaults:", defaultSettings);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <IconSettings className="mr-2 h-4 w-4" />
          Reading Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Reading Settings</h3>
            <p className="text-xs text-muted-foreground">
              Customize your reading experience
            </p>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="text-sm">
                Font Size
              </Label>
              <span className="text-xs text-muted-foreground">{settings.fontSize}px</span>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={(value) => updateSetting("fontSize", value[0])}
              className="w-full"
            />
          </div>

          {/* Line Height */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="line-height" className="text-sm">
                Line Height
              </Label>
              <span className="text-xs text-muted-foreground">{settings.lineHeight}</span>
            </div>
            <Slider
              id="line-height"
              min={1.2}
              max={2.0}
              step={0.1}
              value={[settings.lineHeight]}
              onValueChange={(value) => updateSetting("lineHeight", value[0])}
              className="w-full"
            />
          </div>

          {/* Font Family */}
          <div className="space-y-3">
            <Label className="text-sm">Font Family</Label>
            <RadioGroup
              value={settings.fontFamily}
              onValueChange={(value) =>
                updateSetting("fontFamily", value as "noto-sans" | "noto-serif")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noto-sans" id="noto-sans" />
                <Label htmlFor="noto-sans" className="text-sm font-normal">
                  Noto Sans
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noto-serif" id="noto-serif" />
                <Label htmlFor="noto-serif" className="text-sm font-normal">
                  Noto Serif
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Text Alignment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-align" className="text-sm">
                Justify Text
              </Label>
              <Switch
                id="text-align"
                checked={settings.textAlign === "justify"}
                onCheckedChange={(checked) =>
                  updateSetting("textAlign", checked ? "justify" : "left")
                }
              />
            </div>
          </div>

          {/* Show Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-images" className="text-sm">
                Show Images
              </Label>
              <Switch
                id="show-images"
                checked={settings.showImages}
                onCheckedChange={(checked) => updateSetting("showImages", checked)}
              />
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-2 border-t space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full"
            >
              Reset to Default
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearAllSettings}
              className="w-full"
            >
              Clear All Settings
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
