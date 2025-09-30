"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface KeyFeature {
  feature_name: string;
  benefit: string;
}

interface EmailPreferenceData {
  email: string;
  product_name: string;
  product_description: string;
  key_features: KeyFeature[];
  usp: string;
  cta: string;
  sellerName: string;
  sellerTitle: string;
}

export function EmailPreferenceDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmailPreferenceData) => void;
  initialData?: Partial<EmailPreferenceData>;
}) {
  const [form, setForm] = useState<EmailPreferenceData>({
    email: initialData?.email || "",
    product_name: initialData?.product_name || "",
    product_description: initialData?.product_description || "",
    key_features: initialData?.key_features || [
      { feature_name: "", benefit: "" },
    ],
    usp: initialData?.usp || "",
    cta: initialData?.cta || "",
    sellerName: initialData?.sellerName || "",
    sellerTitle: initialData?.sellerTitle || "",
  });

  const handleFeatureChange = (
    idx: number,
    field: keyof KeyFeature,
    value: string
  ) => {
    setForm((prev) => {
      const features = [...prev.key_features];
      features[idx] = { ...features[idx], [field]: value };
      return { ...prev, key_features: features };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      key_features: [...prev.key_features, { feature_name: "", benefit: "" }],
    }));
  };

  const removeFeature = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      key_features: prev.key_features.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (field: keyof EmailPreferenceData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store all preferences in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("emailPreference", JSON.stringify(form));
    }
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] max-h-[90vh] p-0 flex flex-col">
        <div className="flex flex-col h-full min-h-[60vh] max-h-[90vh]">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl">Email Preferences</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Left Column */}
              <div className="space-y-5 pr-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-base border-b pb-2">
                    Personal Information
                  </h3>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email Address
                    </label>
                    <Input
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      type="email"
                      className="h-10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Your Name
                      </label>
                      <Input
                        value={form.sellerName}
                        onChange={(e) =>
                          handleChange("sellerName", e.target.value)
                        }
                        placeholder="John Doe"
                        required
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Your Title
                      </label>
                      <Input
                        value={form.sellerTitle}
                        onChange={(e) =>
                          handleChange("sellerTitle", e.target.value)
                        }
                        placeholder="Sales Manager"
                        required
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-base border-b pb-2">
                    Product Details
                  </h3>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Product Name
                    </label>
                    <Input
                      value={form.product_name}
                      onChange={(e) =>
                        handleChange("product_name", e.target.value)
                      }
                      placeholder="Your amazing product"
                      required
                      className="h-10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Product Description
                    </label>
                    <Textarea
                      value={form.product_description}
                      onChange={(e) =>
                        handleChange("product_description", e.target.value)
                      }
                      placeholder="Brief description of what your product does..."
                      required
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Unique Selling Proposition
                    </label>
                    <Textarea
                      value={form.usp}
                      onChange={(e) => handleChange("usp", e.target.value)}
                      placeholder="What makes your product unique and different..."
                      required
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Call to Action
                    </label>
                    <Input
                      value={form.cta}
                      onChange={(e) => handleChange("cta", e.target.value)}
                      placeholder="e.g., Schedule a demo, Start free trial"
                      required
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Features */}
              <div className="space-y-4 pr-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-base">
                    Key Features & Benefits
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-3">
                  {form.key_features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="relative border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      {form.key_features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <div className="space-y-3 pr-6">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Feature Name
                          </label>
                          <Input
                            value={feature.feature_name}
                            onChange={(e) =>
                              handleFeatureChange(
                                idx,
                                "feature_name",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Real-time Analytics"
                            required
                            className="h-9"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Benefit
                          </label>
                          <Textarea
                            value={feature.benefit}
                            onChange={(e) =>
                              handleFeatureChange(
                                idx,
                                "benefit",
                                e.target.value
                              )
                            }
                            placeholder="How does this feature help customers?"
                            required
                            rows={2}
                            className="resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t bg-muted/20">
            <div className="flex gap-3 w-full justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-24"
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} className="w-24">
                Save
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
