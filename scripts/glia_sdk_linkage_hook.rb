def glia_sdk_force_dynamic_linkage(installer) 
    dynamic_frameworks = ['GliaWidgets', 'GliaCoreSDK', 'GliaCoreDependency', 'TwilioVoice', 'WebRTC-lib']
    installer.pod_targets.each do |pod|
        if dynamic_frameworks.include?(pod.name)
            def pod.build_type;
                Pod::BuildType.dynamic_framework
            end
        end
    end
end