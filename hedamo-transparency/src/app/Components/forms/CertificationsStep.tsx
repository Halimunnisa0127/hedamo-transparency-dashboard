import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface Certification {
  type: string;
  id: string;
  issuer: string;
}

interface CertificationsStepProps {
  data: { certifications?: { items: Certification[] } };
  onChange: (data: any) => void; // Make more flexible
  errors?: any;
  onSkip?: () => void;
}

const CertificationsStep = forwardRef<{ validate: () => boolean }, CertificationsStepProps>(
  ({ data, onChange, onSkip }, ref) => {
    const [certifications, setCertifications] = useState<Certification[]>(
      Array.isArray(data.certifications?.items) && data.certifications.items.length > 0
        ? data.certifications.items
        : [{ type: '', id: '', issuer: '' }]
    );

    const [idErrors, setIdErrors] = useState<{ [key: number]: string }>({});

    const handleAddCertification = () => {
      const newCerts = [...certifications, { type: '', id: '', issuer: '' }];
      setCertifications(newCerts);
      onChange({ certifications: { items: newCerts } });
    };

    const handleRemoveCertification = (index: number) => {
      if (certifications.length === 1) return;
      const newCerts = certifications.filter((_, i) => i !== index);
      setCertifications(newCerts);
      setIdErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
      onChange({ certifications: { items: newCerts } });
    };

    const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
      const newCerts = certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      );
      setCertifications(newCerts);

      if (field === 'id' && value) {
        if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(value)) {
          setIdErrors((prev) => ({ ...prev, [index]: 'ID must contain letters and numbers.' }));
        } else {
          setIdErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[index];
            return newErrors;
          });
        }
      }

      onChange({ certifications: { items: newCerts } });
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        let valid = true;
        certifications.forEach((cert, i) => {
          if (!cert.type || !cert.id || !cert.issuer || idErrors[i]) valid = false;
        });
        return valid;
      },
    }));

    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add relevant certifications and verifications.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Certification {index + 1}</h3>
                  <Button variant="outline" size="sm" onClick={() => handleRemoveCertification(index)} disabled={certifications.length === 1}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                    <select
                      required
                      className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      value={cert.type}
                      onChange={(e) => handleCertificationChange(index, 'type', e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="organic">Organic</option>
                      <option value="fair_trade">Fair Trade</option>
                      <option value="cruelty_free">Cruelty Free</option>
                      <option value="vegan">Vegan</option>
                      <option value="non_gmo">Non-GMO</option>
                      <option value="sustainable">Sustainable</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID *</label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 border rounded-lg ${
                        idErrors[index] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      value={cert.id}
                      onChange={(e) => handleCertificationChange(index, 'id', e.target.value)}
                      placeholder="e.g., USDA-12345"
                    />
                    {idErrors[index] && <p className="text-red-500 text-sm mt-1">{idErrors[index]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuer *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                      placeholder="e.g., USDA, Fair Trade"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAddCertification} className="flex-1">
                <Plus className="w-4 h-4 mr-2" /> Add Certification
              </Button>
              {onSkip && (
                <Button variant="outline" onClick={onSkip} className="flex-1">
                  Skip this step
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default CertificationsStep;