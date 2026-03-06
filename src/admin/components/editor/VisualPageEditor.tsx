// VisualPageEditor.tsx - GrapesJS-based Visual Editor (Elementor-like)
// A drag-and-drop page builder with live preview

import React, { useEffect, useRef, useState, useCallback } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { supabase } from '../../../lib/supabase';

interface VisualPageEditorProps {
  initialHtml?: string;
  initialCss?: string;
  pageTitle?: string;
  onSave?: (html: string, css: string, components: any) => void;
  onPublish?: (html: string, css: string, components: any) => void;
}

const VisualPageEditor: React.FC<VisualPageEditorProps> = ({
  initialHtml = '',
  initialCss = '',
  pageTitle = 'Nouvelle page',
  onSave,
  onPublish
}) => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Initialize GrapesJS editor
  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    // Define custom blocks for the website
    const defineBlocks = (editor: any) => {
      const bm = editor.BlockManager;

      // Image upload block with upload functionality
      bm.add('image-upload', {
        label: 'Image avec Upload',
        category: 'Media',
        attributes: { class: 'gjs-fonts gjs-f-image' },
        content: {
          type: 'image',
          style: {
            'max-width': '100%',
            height: 'auto',
            'min-height': '200px'
          },
          src: 'https://via.placeholder.com/800x400?text=Cliquez+pour+ajouter+une+image',
          attributes: { 
            alt: 'Image',
            'data-uploaded': 'false'
          }
        },
        // Make image clickable to upload
        onClick: () => {
          // This will be handled by the traits
        }
      });

      // Hero Section Block
      bm.add('hero-section', {
        label: 'Hero Section',
        category: 'Sections',
        attributes: { class: 'gjs-fonts gjs-f-h1p' },
        content: `
          <section class="hero-section" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 20px;">
            <div style="text-align: center; max-width: 800px;">
              <h1 style="color: white; font-size: 3.5rem; margin-bottom: 20px; font-weight: 700;">Titre Principal</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 1.5rem; margin-bottom: 30px;">Sous-titre de la section</p>
              <button style="background: #10b981; color: white; padding: 15px 40px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">Call to Action</button>
            </div>
          </section>
        `
      });

      // Services Grid Block
      bm.add('services-grid', {
        label: 'Services Grid',
        category: 'Sections',
        content: `
          <section class="services-section" style="padding: 80px 20px; background: #f9fafb;">
            <div style="max-width: 1200px; margin: 0 auto;">
              <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 50px; color: #1f2937;">Nos Services</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="width: 60px; height: 60px; background: #dbeafe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 1.5rem;">⚡</span>
                  </div>
                  <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #1f2937;">Service 1</h3>
                  <p style="color: #6b7280; line-height: 1.6;">Description du service...</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="width: 60px; height: 60px; background: #dbeafe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 1.5rem;">💆</span>
                  </div>
                  <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #1f2937;">Service 2</h3>
                  <p style="color: #6b7280; line-height: 1.6;">Description du service...</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="width: 60px; height: 60px; background: #dbeafe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 1.5rem;">🔬</span>
                  </div>
                  <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #1f2937;">Service 3</h3>
                  <p style="color: #6b7280; line-height: 1.6;">Description du service...</p>
                </div>
              </div>
            </div>
          </section>
        `
      });

      // About Section Block
      bm.add('about-section', {
        label: 'À Propos',
        category: 'Sections',
        content: `
          <section class="about-section" style="padding: 80px 20px; background: white;">
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
              <div>
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #1f2937;">À Propos de Nous</h2>
                <p style="color: #6b7280; line-height: 1.8; margin-bottom: 20px;">Description détaillée de votre entreprise ou cabinet...</p>
                <ul style="list-style: none; padding: 0;">
                  <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                    <span style="color: #10b981;">✓</span> Point fort 1
                  </li>
                  <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                    <span style="color: #10b981;">✓</span> Point fort 2
                  </li>
                  <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                    <span style="color: #10b981;">✓</span> Point fort 3
                  </li>
                </ul>
              </div>
              <div style="background: #e5e7eb; height: 400px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #9ca3af; font-size: 1.2rem;">Image</span>
              </div>
            </div>
          </section>
        `
      });

      // CTA Section Block
      bm.add('cta-section', {
        label: 'Appel à l\'Action',
        category: 'Sections',
        content: `
          <section class="cta-section" style="padding: 80px 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <div style="text-align: center; max-width: 800px; margin: 0 auto;">
              <h2 style="color: white; font-size: 2.5rem; margin-bottom: 20px;">Prêt à Commencer?</h2>
              <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 30px;">Rejoignez-nous pour transformer votre santé et votre bien-être.</p>
              <div style="display: flex; gap: 20px; justify-content: center;">
                <button style="background: white; color: #10b981; padding: 15px 40px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; font-weight: 600;">Contactez-nous</button>
                <button style="background: transparent; color: white; padding: 15px 40px; border: 2px solid white; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">En savoir plus</button>
              </div>
            </div>
          </section>
        `
      });

      // Contact Form Block
      bm.add('contact-form', {
        label: 'Formulaire de Contact',
        category: 'Forms',
        content: `
          <section class="contact-section" style="padding: 80px 20px; background: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px; color: #1f2937;">Contactez-nous</h2>
              <form style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 20px;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">Nom</label>
                  <input type="text" placeholder="Votre nom" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 20px;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">Email</label>
                  <input type="email" placeholder="votre@email.com" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 20px;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">Message</label>
                  <textarea placeholder="Votre message..." rows="5" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                <button type="submit" style="width: 100%; background: #10b981; color: white; padding: 15px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; font-weight: 600;">Envoyer</button>
              </form>
            </div>
          </section>
        `
      });

      // Image Block
      bm.add('image-block', {
        label: 'Image',
        category: 'Basic',
        attributes: { class: 'gjs-fonts gjs-f-image' },
        content: {
          type: 'image',
          style: {
            'max-width': '100%',
            height: 'auto'
          },
          src: 'https://via.placeholder.com/800x400?text=Image',
          attributes: { alt: 'Image placeholder' }
        }
      });

      // Text Block
      bm.add('text-block', {
        label: 'Text',
        category: 'Basic',
        attributes: { class: 'gjs-fonts gjs-f-text' },
        content: '<p>Cliquez pour éditer ce texte...</p>'
      });

      // Video Block
      bm.add('video-block', {
        label: 'Video',
        category: 'Basic',
        attributes: { class: 'gjs-fonts gjs-f-video' },
        content: {
          type: 'video',
          src: '',
          style: {
            'max-width': '100%',
            height: 'auto'
          },
          attributes: { 
            controls: true,
            poster: 'https://via.placeholder.com/800x450?text=Video'
          }
        }
      });

      // Gallery Block
      bm.add('gallery-grid', {
        label: 'Galerie',
        category: 'Media',
        content: `
          <section class="gallery-section" style="padding: 80px 20px;">
            <div style="max-width: 1200px; margin: 0 auto;">
              <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Galerie</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                <div style="background: #e5e7eb; height: 200px; border-radius: 8px;"></div>
                <div style="background: #e5e7eb; height: 200px; border-radius: 8px;"></div>
                <div style="background: #e5e7eb; height: 200px; border-radius: 8px;"></div>
                <div style="background: #e5e7eb; height: 200px; border-radius: 8px;"></div>
              </div>
            </div>
          </section>
        `
      });

      // Testimonials Block
      bm.add('testimonials', {
        label: 'Témoignages',
        category: 'Sections',
        content: `
          <section class="testimonials-section" style="padding: 80px 20px; background: #f9fafb;">
            <div style="max-width: 1200px; margin: 0 auto;">
              <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">Témoignages</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <p style="color: #6b7280; font-style: italic; margin-bottom: 20px;">"Excellent service, je recommande fortement!"</p>
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; background: #d1d5db; border-radius: 50%;"></div>
                    <div>
                      <p style="font-weight: 600; color: #1f2937;">Nom du client</p>
                      <p style="color: #9ca3af; font-size: 0.9rem;">Client satisfait</p>
                    </div>
                  </div>
                </div>
                <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <p style="color: #6b7280; font-style: italic; margin-bottom: 20px;">"Des résultats incroyables après quelques séances!"</p>
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; background: #d1d5db; border-radius: 50%;"></div>
                    <div>
                      <p style="font-weight: 600; color: #1f2937;">Nom du client</p>
                      <p style="color: #9ca3af; font-size: 0.9rem;">Client satisfait</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        `
      });

      // FAQ Block
      bm.add('faq-section', {
        label: 'FAQ',
        category: 'Sections',
        content: `
          <section class="faq-section" style="padding: 80px 20px;">
            <div style="max-width: 800px; margin: 0 auto;">
              <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Questions Fréquentes</h2>
              <div style="space-y: 20px;">
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                  <h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #1f2937;">Question 1?</h3>
                  <p style="color: #6b7280;">Réponse à la question...</p>
                </div>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                  <h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #1f2937;">Question 2?</h3>
                  <p style="color: #6b7280;">Réponse à la question...</p>
                </div>
              </div>
            </div>
          </section>
        `
      });

      // Footer Block
      bm.add('footer-section', {
        label: 'Pied de page',
        category: 'Sections',
        content: `
          <footer class="footer-section" style="background: #1f2937; color: white; padding: 60px 20px 30px;">
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
              <div>
                <h3 style="font-size: 1.5rem; margin-bottom: 20px;">Entreprise</h3>
                <p style="color: #9ca3af; line-height: 1.6;">Description courte...</p>
              </div>
              <div>
                <h3 style="font-size: 1.2rem; margin-bottom: 20px;">Liens Rapides</h3>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 10px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Accueil</a></li>
                  <li style="margin-bottom: 10px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Services</a></li>
                  <li style="margin-bottom: 10px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 style="font-size: 1.2rem; margin-bottom: 20px;">Contact</h3>
                <p style="color: #9ca3af;">Email: contact@email.com</p>
                <p style="color: #9ca3af;">Téléphone: +237 6XX XXX XXX</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151;">
              <p style="color: #9ca3af;">© 2024 Entreprise. Tous droits réservés.</p>
            </div>
          </footer>
        `
      });

      // Modal Popup Block
      bm.add('modal-popup', {
        label: 'Fenêtre Modal',
        category: 'Modals',
        content: `
          <div class="modal-trigger" style="padding: 40px; text-align: center; background: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer;">
            <p style="margin: 0; color: #6b7280;">Cliquez pour ajouter le contenu de la fenêtre modale</p>
            <button style="margin-top: 15px; padding: 10px 25px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Ouvrir Modal</button>
          </div>
          <div class="modal-content" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
            <div style="background: white; padding: 40px; border-radius: 12px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
              <button style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">×</button>
              <h2 style="margin-top: 0; font-size: 1.8rem; margin-bottom: 20px;">Titre de la Modal</h2>
              <p style="color: #6b7280; line-height: 1.6;">Contenu de votre fenêtre modale...</p>
              <button style="margin-top: 20px; padding: 12px 30px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Appel à l'action</button>
            </div>
          </div>
        `
      });

      // Callback Modal Block
      bm.add('callback-modal', {
        label: 'Modal Rappel',
        category: 'Modals',
        content: `
          <div class="callback-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
            <div style="background: white; padding: 40px; border-radius: 12px; max-width: 450px; width: 90%; position: relative;">
              <button style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">×</button>
              <h2 style="margin-top: 0; font-size: 1.5rem; margin-bottom: 10px; color: #1f2937;">Demandez un rappel</h2>
              <p style="color: #6b7280; margin-bottom: 20px; font-size: 0.95rem;">Laissez votre numéro et nous vous rappelons!</p>
              <input type="text" placeholder="Votre nom" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 12px; font-size: 1rem;">
              <input type="tel" placeholder="Votre téléphone" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 12px; font-size: 1rem;">
              <button style="width: 100%; padding: 14px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Me rappeler</button>
            </div>
          </div>
        `
      });

      // Newsletter Modal Block
      bm.add('newsletter-modal', {
        label: 'Modal Newsletter',
        category: 'Modals',
        content: `
          <div class="newsletter-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
            <div style="background: white; padding: 40px; border-radius: 12px; max-width: 500px; width: 90%; text-align: center; position: relative;">
              <button style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">×</button>
              <div style="font-size: 3rem; margin-bottom: 15px;">📧</div>
              <h2 style="margin-top: 0; font-size: 1.5rem; margin-bottom: 10px; color: #1f2937;">Abonnez-vous à notre newsletter</h2>
              <p style="color: #6b7280; margin-bottom: 25px; font-size: 0.95rem;">Recevez nos conseils santé et nos offres spéciales!</p>
              <input type="email" placeholder="Votre email" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 12px; font-size: 1rem;">
              <button style="width: 100%; padding: 14px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">S'abonner</button>
              <p style="margin-top: 15px; font-size: 0.8rem; color: #9ca3af;">Pas de spam, désabonnement possible</p>
            </div>
          </div>
        `
      });
    };

    // Initialize GrapesJS
    const editor = grapesjs.init({
      container: containerRef.current,
      height: '100%',
      width: '100%',
      storageManager: false,
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile', width: '320px', widthMedia: '480px' }
        ]
      },
      panels: { defaults: [] },
      blockManager: {
        appendTo: '#blocks-panel'
      },
      styleManager: {
        appendTo: '#styles-panel'
      },
      traitManager: {
        appendTo: '#traits-panel'
      },
      selectorManager: { appendTo: '#selectors-panel' },
      assetManager: {
        embedAsBase64: false,
        assets: []
      }
    });

    // Add custom image upload to asset manager
    const am = editor.AssetManager;
    
    // Create custom upload button
    const uploadBtn = document.createElement('button');
    uploadBtn.innerHTML = '📤 Uploader une image';
    uploadBtn.className = 'gjs-am-upload-btn';
    uploadBtn.style.cssText = 'width: 100%; padding: 10px; margin-bottom: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;';
    uploadBtn.onclick = async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploading(true);
        try {
          // Generate unique filename
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `editor/${fileName}`;
          
          // Upload to Supabase Storage
          const { data, error } = await supabase.storage
            .from('cms-images')
            .upload(filePath, file);
          
          if (error) throw error;
          
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('cms-images')
            .getPublicUrl(filePath);
          
          // Add to asset manager
          am.add([{
            src: urlData.publicUrl,
            type: 'image',
            height: 400,
            width: 800
          }]);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Erreur lors de l\'upload de l\'image. Vérifiez votre connexion Supabase.');
        } finally {
          setUploading(false);
        }
      };
      input.click();
    };
    
    // Add upload button to asset manager panel
    const amContainer = document.querySelector('.gjs-am');
    if (amContainer) {
      amContainer.insertBefore(uploadBtn, amContainer.firstChild);
    }

    // Add double-click to upload image functionality
    editor.on('component:selected', (component: any) => {
      if (component.get('type') === 'image') {
        const imgEl = component.getEl();
        if (imgEl) {
          imgEl.style.cursor = 'pointer';
          imgEl.title = 'Double-cliquez pour changer l\'image';
          
          imgEl.ondblclick = async (e: any) => {
            e.stopPropagation();
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (e: any) => {
              const file = e.target.files[0];
              if (!file) return;
              
              setUploading(true);
              try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `editor/${fileName}`;
                
                const { data, error } = await supabase.storage
                  .from('cms-images')
                  .upload(filePath, file);
                
                if (error) throw error;
                
                const { data: urlData } = supabase.storage
                  .from('cms-images')
                  .getPublicUrl(filePath);
                
                component.set({ src: urlData.publicUrl });
              } catch (error) {
                console.error('Error uploading image:', error);
                alert('Erreur lors de l\'upload de l\'image');
              } finally {
                setUploading(false);
              }
            };
            input.click();
          };
        }
      }
    });

    // Define custom blocks
    defineBlocks(editor);

    // Load initial content if provided
    if (initialHtml) {
      editor.setComponents(initialHtml);
    }
    if (initialCss) {
      editor.setStyle(initialCss);
    }

    // Store editor reference
    editorRef.current = editor;
    setIsLoaded(true);

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialHtml, initialCss]);

  // Handle save
  const handleSave = useCallback(() => {
    if (!editorRef.current) return;
    
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    const components = editorRef.current.getComponents();
    
    if (onSave) {
      onSave(html, css, components);
    }
  }, [onSave]);

  // Handle publish
  const handlePublish = useCallback(() => {
    if (!editorRef.current) return;
    
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    const components = editorRef.current.getComponents();
    
    if (onPublish) {
      onPublish(html, css, components);
    }
  }, [onPublish]);

  return (
    <div className="visual-editor" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Editor Toolbar */}
      <div className="editor-toolbar" style={{
        background: '#1f2937',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #374151'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>{pageTitle}</h2>
          <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Visual Editor</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 20px',
              background: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Sauvegarder
          </button>
          <button
            onClick={handlePublish}
            style={{
              padding: '8px 20px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            Publier
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="editor-container" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Blocks & Upload */}
        <div style={{
          width: '280px',
          background: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Image Upload Section */}
          <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>
              Médias
            </h3>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              background: uploading ? '#d1d5db' : '#10b981',
              color: 'white',
              borderRadius: '6px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'background 0.2s'
            }}>
              {uploading ? (
                <>
                  <span className="animate-spin" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                  Upload en cours...
                </>
              ) : (
                <>
                  <span>📤</span>
                  Uploader une image
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !editorRef.current) return;
                  
                  setUploading(true);
                  try {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `editor/${fileName}`;
                    
                    const { data, error } = await supabase.storage
                      .from('cms-images')
                      .upload(filePath, file);
                    
                    if (error) throw error;
                    
                    const { data: urlData } = supabase.storage
                      .from('cms-images')
                      .getPublicUrl(filePath);
                    
                    // Add to asset manager and select it
                    const am = editorRef.current.AssetManager;
                    am.add([{
                      src: urlData.publicUrl,
                      type: 'image',
                      height: 400,
                      width: 800
                    }]);
                    
                    // Open asset manager
                    editorRef.current.openAsset();
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    alert('Erreur lors de l\'upload. Assurez-vous que le bucket \"cms-images\" existe dans Supabase.');
                  } finally {
                    setUploading(false);
                  }
                }}
                style={{ display: 'none' }}
              />
            </label>
            <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
              Cliquez puis glissez l'image dans la page
            </p>
          </div>
          
          {/* Blocks Panel */}
          <div id="blocks-panel" style={{ flex: 1, overflow: 'auto' }} />
        </div>

        {/* Main Editor Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div ref={containerRef} style={{ height: '100%' }} />
        </div>

        {/* Right Panel - Styles & Traits */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', background: '#f9fafb', borderLeft: '1px solid #e5e7eb' }}>
          <div id="styles-panel" style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase' }}>
              Styles
            </h3>
          </div>
          <div id="traits-panel" style={{ flex: 1, overflow: 'auto', padding: '10px', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase' }}>
              Propriétés
            </h3>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="animate-spin" style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTopColor: '#10b981',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 15px'
            }} />
            <p style={{ color: '#6b7280' }}>Chargement de l'éditeur...</p>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .gjs-cv-canvas {
          width: 100%;
          height: 100%;
        }
        .gjs-block {
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 10px;
          cursor: move;
          transition: all 0.2s;
        }
        .gjs-block:hover {
          border-color: #10b981;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        }
        .gjs-block-category {
          margin-bottom: 15px;
        }
        .gjs-block-category-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default VisualPageEditor;
