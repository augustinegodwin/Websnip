"use client";
import { Fragment, useState } from 'react';
import { Dialog, Transition, Switch, Disclosure } from '@headlessui/react';
import { X, Settings, ChevronDown, Monitor, Smartphone, Tablet, Zap, Shield, Clock, Image as ImageIcon } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onGenerate: (settings: ConversionSettings) => void;
}

export interface ConversionSettings {
  width: number;
  height: number;
  deviceScaleFactor: number;
  format: 'png' | 'jpeg' | 'webp';
  quality: number;
  fullPage: boolean;
  disableJavaScript: boolean;
  blockAds: boolean;
  delay: number;
  waitForSelector: string;
  viewportWidth: number;
  viewportHeight: number;
  darkMode: boolean;
  hideElements: string;
  removeElements: string;
  css: string;
}

const presets = [
  { name: 'Desktop HD', width: 1920, height: 1080, icon: Monitor },
  { name: 'Mobile', width: 375, height: 812, icon: Smartphone },
  { name: 'Tablet', width: 768, height: 1024, icon: Tablet },
];

export function SettingsModal({ isOpen, closeModal, onGenerate }: SettingsModalProps) {
  const [settings, setSettings] = useState<ConversionSettings>({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
    format: 'png',
    quality: 90,
    fullPage: false,
    disableJavaScript: false,
    blockAds: true,
    delay: 0,
    waitForSelector: '',
    viewportWidth: 1200,
    viewportHeight: 800,
    darkMode: false,
    hideElements: '',
    removeElements: '',
    css: '',
  });

  const handleGenerate = () => {
    onGenerate(settings);
    closeModal();
  };

  const applyPreset = (preset: { width: number; height: number }) => {
    setSettings(prev => ({
      ...prev,
      width: preset.width,
      height: preset.height,
      viewportWidth: preset.width,
      viewportHeight: preset.height,
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full  h-full items-center justify-center sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl max-h-full sm:h-auto transform overflow-y-scroll scrollable sm:rounded-2xl bg-background text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center z-10 sticky top-0 px-4 sm:px-6 justify-between py-4 bg-background">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Settings className="w-6 h-6 mr-2" />
                    {/* Conversion Settings */}
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 sm:px-6 px-4">
                  {/* Quick Presets */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Presets</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {presets.map((preset) => {
                        const Icon = preset.icon;
                        return (
                          <button
                            key={preset.name}
                            onClick={() => applyPreset(preset)}
                            className="flex flex-col items-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                          >
                            <Icon className="w-6 h-6 mb-1 text-gray-600 dark:text-gray-400" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{preset.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-500">{preset.width}×{preset.height}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={settings.width}
                        onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 1200 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                        min="100"
                        max="4000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={settings.height}
                        onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 800 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                        min="100"
                        max="4000"
                      />
                    </div>
                  </div>

                  {/* Format and Quality */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Format
                      </label>
                      <select
                        value={settings.format}
                        onChange={(e) => setSettings(prev => ({ ...prev, format: e.target.value as 'png' | 'jpeg' | 'webp' }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                      >
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="webp">WebP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quality ({settings.quality}%)
                      </label>
                      <input
                        type="range"
                        value={settings.quality}
                        onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                        className="w-full"
                        min="10"
                        max="100"
                        step="5"
                      />
                    </div>
                  </div>

                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Basic Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Page Screenshot</span>
                        <Switch
                          checked={settings.fullPage}
                          onChange={(checked:boolean) => setSettings(prev => ({ ...prev, fullPage: checked }))}
                          className={`${settings.fullPage ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                          <span className={`${settings.fullPage ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disable JavaScript</span>
                        <Switch
                          checked={settings.disableJavaScript}
                          onChange={(checked:boolean) => setSettings(prev => ({ ...prev, disableJavaScript: checked }))}
                          className={`${settings.disableJavaScript ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                          <span className={`${settings.disableJavaScript ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Block Ads</span>
                        <Switch
                          checked={settings.blockAds}
                          onChange={(checked:boolean) => setSettings(prev => ({ ...prev, blockAds: checked }))}
                          className={`${settings.blockAds ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                          <span className={`${settings.blockAds ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                        <Switch
                          checked={settings.darkMode}
                          onChange={(checked:boolean) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                          className={`${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                          <span className={`${settings.darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                        </Switch>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Delay (seconds)
                      </label>
                      <input
                        type="number"
                        value={settings.delay}
                        onChange={(e) => setSettings(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                        min="0"
                        max="30"
                      />
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <Disclosure>
                    {({ open }: { open: boolean }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                          <span>Advanced Settings</span>
                          <ChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500 transition-transform`} />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="mt-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Wait for Selector (CSS)
                              </label>
                              <input
                                type="text"
                                value={settings.waitForSelector}
                                onChange={(e) => setSettings(prev => ({ ...prev, waitForSelector: e.target.value }))}
                                placeholder="#main-content, .loading-complete"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Hide Elements (CSS Selectors)
                              </label>
                              <input
                                type="text"
                                value={settings.hideElements}
                                onChange={(e) => setSettings(prev => ({ ...prev, hideElements: e.target.value }))}
                                placeholder=".ads, .popup, #cookie-banner"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Custom CSS
                              </label>
                              <textarea
                                value={settings.css}
                                onChange={(e) => setSettings(prev => ({ ...prev, css: e.target.value }))}
                                placeholder="body { background: white; }"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Device Scale Factor
                              </label>
                              <select
                                value={settings.deviceScaleFactor}
                                onChange={(e) => setSettings(prev => ({ ...prev, deviceScaleFactor: parseFloat(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-white/5 dark:text-white"
                              >
                                <option value={1}>1x (Standard)</option>
                                <option value={1.5}>1.5x</option>
                                <option value={2}>2x (Retina)</option>
                                <option value={3}>3x (High DPI)</option>
                              </select>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>

                <div className="py-4 bg-background z-10 flex justify-between px-4 sm:px-6 sticky bottom-0">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Generate Image
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}