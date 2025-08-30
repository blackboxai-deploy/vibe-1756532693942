'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { africanCountries, getAllRegions, getCountriesByRegion } from '@/lib/data/countries';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = getAllRegions();

  const filteredCountries = useMemo(() => {
    let countries = africanCountries;

    // Filter by region
    if (selectedRegion !== 'all') {
      countries = getCountriesByRegion(selectedRegion);
    }

    // Filter by search term
    if (searchTerm) {
      countries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return countries.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, selectedRegion]);

  const getCountryFlag = (countryCode: string) => {
    // Simple flag representation using country code
    return countryCode;
  };

  const selectedCountryData = africanCountries.find(c => c.code === selectedCountry);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Select Your Country
        </h3>
        <p className="text-gray-600 mb-6">
          Choose from any of the 54 African countries to begin your eligibility assessment.
        </p>
      </div>

      {/* Current Selection */}
      {selectedCountryData && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold">
                {getCountryFlag(selectedCountryData.code)}
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">{selectedCountryData.name}</h4>
                <p className="text-sm text-blue-700">{selectedCountryData.region}</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Selected
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedRegion === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === region
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Countries List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Countries ({filteredCountries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-2">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => onCountryChange(country.code)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedCountry === country.code
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold">
                      {getCountryFlag(country.code)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{country.name}</h4>
                      <p className="text-sm text-gray-600">{country.region}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {country.educationSystems.map((system) => (
                          <Badge
                            key={system}
                            variant="outline"
                            className="text-xs"
                          >
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Why we need your country</h4>
        <p className="text-sm text-gray-600">
          Each African country has unique education systems and exam boards. 
          Selecting your country helps us provide accurate grade conversion and 
          eligibility assessment based on your specific academic background.
        </p>
      </div>
    </div>
  );
}