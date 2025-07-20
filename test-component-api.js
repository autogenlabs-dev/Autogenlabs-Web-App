// Test Component APIs
// Run this in the browser console to test the component APIs

// Make sure you have a valid auth token first
const testAuthToken = 'your-auth-token-here'; // Replace with real token
localStorage.setItem('access_token', testAuthToken);

// Test API functions
async function testComponentAPIs() {
    try {
        console.log('🚀 Testing Component APIs...');
        
        // Test 1: Get all components
        console.log('\n📋 Test 1: Get all components');
        const allComponents = await fetch('http://localhost:8000/components', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const componentsData = await allComponents.json();
        console.log('✅ Get all components:', componentsData);
        
        // Test 2: Create a test component (requires auth)
        console.log('\n🆕 Test 2: Create component');
        const newComponent = {
            title: "Test Navigation Component",
            category: "Navigation",
            type: "Component",
            language: "React",
            difficulty_level: "Easy",
            plan_type: "Free",
            pricing_inr: 0,
            pricing_usd: 0,
            short_description: "A beautiful navigation component for modern websites",
            full_description: "This is a comprehensive navigation component built with React and Tailwind CSS. It features responsive design, smooth animations, and multiple layout options.",
            preview_images: [],
            git_repo_url: "https://github.com/test/nav-component",
            live_demo_url: "https://nav-demo.vercel.app",
            dependencies: ["react", "tailwindcss"],
            tags: ["navigation", "responsive", "modern"],
            developer_name: "Test Developer",
            developer_experience: "5",
            is_available_for_dev: true,
            featured: false
        };
        
        const createResponse = await fetch('http://localhost:8000/components', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(newComponent)
        });
        
        if (createResponse.ok) {
            const createdComponent = await createResponse.json();
            console.log('✅ Component created:', createdComponent);
            
            // Test 3: Get the created component
            console.log('\n🔍 Test 3: Get specific component');
            const componentId = createdComponent._id || createdComponent.id;
            const getResponse = await fetch(`http://localhost:8000/components/${componentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const componentData = await getResponse.json();
            console.log('✅ Get component:', componentData);
            
            // Test 4: Update the component
            console.log('\n📝 Test 4: Update component');
            const updateData = {
                title: "Updated Test Navigation Component",
                short_description: "An updated beautiful navigation component"
            };
            
            const updateResponse = await fetch(`http://localhost:8000/components/${componentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(updateData)
            });
            
            if (updateResponse.ok) {
                const updatedComponent = await updateResponse.json();
                console.log('✅ Component updated:', updatedComponent);
                
                // Test 5: Get user's components
                console.log('\n👤 Test 5: Get user components');
                const userComponentsResponse = await fetch('http://localhost:8000/components/user/my-components', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                
                if (userComponentsResponse.ok) {
                    const userComponents = await userComponentsResponse.json();
                    console.log('✅ User components:', userComponents);
                    
                    // Test 6: Delete the component
                    console.log('\n🗑️ Test 6: Delete component');
                    const deleteResponse = await fetch(`http://localhost:8000/components/${componentId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    
                    if (deleteResponse.ok) {
                        const deleteResult = await deleteResponse.json();
                        console.log('✅ Component deleted:', deleteResult);
                        console.log('\n🎉 All tests completed successfully!');
                    } else {
                        console.error('❌ Delete failed:', await deleteResponse.text());
                    }
                } else {
                    console.error('❌ Get user components failed:', await userComponentsResponse.text());
                }
            } else {
                console.error('❌ Update failed:', await updateResponse.text());
            }
        } else {
            console.error('❌ Create failed:', await createResponse.text());
            console.log('💡 Make sure you have a valid auth token. You need to login first.');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Instructions
console.log('📋 Component API Test Instructions:');
console.log('1. Make sure the backend server is running on http://localhost:8000');
console.log('2. Login to get an auth token first');
console.log('3. Update the testAuthToken variable above with your real token');
console.log('4. Run: testComponentAPIs()');
console.log('');
console.log('🚀 Ready to test! Run: testComponentAPIs()');
