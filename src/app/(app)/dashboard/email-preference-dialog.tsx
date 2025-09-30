"use client";
import { useState, useEffect } from "react";
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
import { useForm, useFieldArray } from "react-hook-form";

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
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailPreferenceData>({
    defaultValues: {
      email: "",
      product_name: "",
      product_description: "",
      key_features: [{ feature_name: "", benefit: "" }],
      usp: "",
      cta: "",
      sellerName: "",
      sellerTitle: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "key_features",
  });

  // Load preferences from localStorage on open
  useEffect(() => {
    if (open && typeof window !== "undefined") {
      const pref = localStorage.getItem("emailPreference");
      if (pref) {
        try {
          const parsed = JSON.parse(pref);
          reset({
            email: parsed.email || "",
            product_name: parsed.product_name || "",
            product_description: parsed.product_description || "",
            key_features:
              parsed.key_features &&
              Array.isArray(parsed.key_features) &&
              parsed.key_features.length > 0
                ? parsed.key_features
                : [{ feature_name: "", benefit: "" }],
            usp: parsed.usp || "",
            cta: parsed.cta || "",
            sellerName: parsed.sellerName || "",
            sellerTitle: parsed.sellerTitle || "",
          });
        } catch {
          reset();
        }
      } else {
        reset();
      }
    }
  }, [open, reset]);

  const onSubmit = (data: EmailPreferenceData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailPreference", JSON.stringify(data));
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent
        className="sm:max-w-[95vw] max-h-[90vh] p-0 flex flex-col"
        onInteractOutside={(e) => {
          if (e.type === "pointerdown") {
            e.preventDefault();
          }
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full min-h-[60vh] max-h-[90vh]"
        >
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
                      {...register("email", { required: true })}
                      placeholder="your@email.com"
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
                        {...register("sellerName", { required: true })}
                        placeholder="John Doe"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Your Title
                      </label>
                      <Input
                        {...register("sellerTitle", { required: true })}
                        placeholder="Sales Manager"
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
                      {...register("product_name", { required: true })}
                      placeholder="Your amazing product"
                      className="h-10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Product Description
                    </label>
                    <Textarea
                      {...register("product_description", { required: true })}
                      placeholder="Brief description of what your product does..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Unique Selling Proposition
                    </label>
                    <Textarea
                      {...register("usp", { required: true })}
                      placeholder="What makes your product unique and different..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Call to Action
                    </label>
                    <Input
                      {...register("cta", { required: true })}
                      placeholder="e.g., Schedule a demo, Start free trial"
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
                    onClick={() => append({ feature_name: "", benefit: "" })}
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-3">
                  {fields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="relative border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(idx)}
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
                            {...register(`key_features.${idx}.feature_name`, {
                              required: true,
                            })}
                            placeholder="e.g., Real-time Analytics"
                            className="h-9"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Benefit
                          </label>
                          <Textarea
                            {...register(`key_features.${idx}.benefit`, {
                              required: true,
                            })}
                            placeholder="How does this feature help customers?"
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
              <Button type="submit" className="w-24">
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
