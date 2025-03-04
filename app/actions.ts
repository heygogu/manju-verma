"use server"; 
export async function submitContactForm(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    
    try {
      // Your existing server logic here (DB connection, email sending, etc.)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      return { success: true };
    } catch (error) {
      console.error('Server action error:', error);
      return { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

 
  