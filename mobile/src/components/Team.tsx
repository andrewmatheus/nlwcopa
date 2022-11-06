import { HStack } from 'native-base';
import CountryFlag from "react-native-country-flag";

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  guessValue?: string;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, onChangeText, guessValue = '' }: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      {guessValue !== '' ? (
        <Input
          value={guessValue}
          w={12}
          h={10}
          textAlign="center"
          fontSize="sm"
          keyboardType="numeric"
          isDisabled={true}          
        />
      ) : (
        <Input          
          w={12}
          h={10}
          textAlign="center"
          fontSize="sm"
          keyboardType="numeric"          
          onChangeText={onChangeText}
        />
      )}

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}